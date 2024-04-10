<?php
require_once("Assertion.php");

enum ArrayName {
	case Get;
	case Post;
	case Session;
}

readonly class InputInfo {
	private string $value;
	private string $displayName;
	
	private int $minLength;
	private int $maxLength;
	
	private ?string $regexPattern;
	private ?string $regexFailureMessage;
	
	public function getValue(): string {
		return $this->value;
	}
	
	public function getDisplayName(): string {
		return $this->displayName;
	}
	
	public function getMinLength(): int {
		return $this->minLength;
	}
	
	public function getMaxLength(): int {
		return $this->maxLength;
	}
	
	public function getRegexPattern(): ?string {
		return $this->regexPattern;
	}
	
	public function getRegexFailureMessage(): ?string {
		return $this->regexFailureMessage;
	}
	
	public function doesValueMatchRegexPattern(): bool {
		// Return true if the pattern is null, evaluate it otherwise
		return $this->regexPattern == null || preg_match($this->regexPattern, $this->value);
	}
	
	public function isValueLengthInRange(): bool {
		// strlen returns wrong values for Persian characters (presumably other Unicode characters as well)
		$length = mb_strlen($this->value);
		return $length >= $this->minLength && $length <= $this->maxLength;
	}
	
	public function __construct(string $value,
	                            string $displayName,
	                            int $minLength,
	                            int $maxLength,
	                            ?string $regexPattern = null,
	                            ?string $regexFailureMessage = null) {
		$this->value               = $value;
		$this->displayName         = $displayName;
		$this->minLength           = $minLength >= 1 ? $minLength : throw new InvalidArgumentException("'minLength' must be greater than zero.");
		$this->maxLength           = $maxLength >= 1 ? $maxLength : throw new InvalidArgumentException("'maxLength' must be greater than zero.");
		$this->regexPattern        = $regexPattern;
		$this->regexFailureMessage = $regexFailureMessage;
	}
}

final class InputManager {
	private function __construct() { }
	
	public static function validateInput(InputInfo ...$inputInfoList): Assertion {
		$getValueNotInRangeMessage = function(InputInfo $info): string {
			return $info->getMinLength() === $info->getMaxLength() ?
				"{$info->getDisplayName()} must be {$info->getMinLength()} characters long." :
				"{$info->getDisplayName()} must be between {$info->getMinLength()} and {$info->getMaxLength()} characters long.";
		};
		
		foreach ($inputInfoList as $info) {
			$infoValue = $info->getValue();
			
			$result = Assertion::assertAll(
				new Assertion(isset($infoValue), "Certain form variables are missing. Please re-enter your information and submit the form again."),
				new Assertion($info->isValueLengthInRange(), $getValueNotInRangeMessage($info)),
				new Assertion($info->doesValueMatchRegexPattern(), $info->getRegexFailureMessage())
			);
			
			if (!$result->isTrue())
				return $result;
		}
		
		return Assertion::getSuccessfulAssertion();
	}
	
	public static function areAllSet(ArrayName $arrayName, string ...$names): bool {
		$array = self::getArray($arrayName);  // No need to unnecessarily retrieve array by reference
		
		foreach ($names as $name) {
			if (!isset($array[$name]))
				return false;
		}
		
		return true;
	}
	
	public static function sanitizeAll(ArrayName $arrayName, string ...$names): void {
		$internalSanitize = fn(string $value): string => trim(preg_replace("/\s+/", " ", filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS)));
		
		$array = &self::getArray($arrayName);
		
		foreach ($names as $name) {
			$array[$name] = $internalSanitize($array[$name]);
		}
	}
	
	private static function &getArray(ArrayName $arrayName): array {
		switch ($arrayName) {
			case ArrayName::Get:     return $_GET;
			case ArrayName::Post:    return $_POST;
			case ArrayName::Session: return $_SESSION;
			default: throw new InvalidArgumentException("The specified array name is invalid.");
		}
	}
}
