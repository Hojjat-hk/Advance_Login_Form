<?php
class Assertion {
	private static ?Assertion $SUCCESSFUL_ASSERTION = null;
	
	private readonly bool $isTrue;
	private readonly ?string $failureMessage;
	
	public static function getSuccessfulAssertion(): Assertion {
		if (self::$SUCCESSFUL_ASSERTION == null)
			self::$SUCCESSFUL_ASSERTION = new Assertion(true);
		
		return self::$SUCCESSFUL_ASSERTION;
	}
	
	public function isTrue(): bool {
		return $this->isTrue;
	}
	
	public function getFailureMessage(): ?string {
		return $this->failureMessage;
	}
	
	public function __construct(bool $isTrue, ?string $failureMessage = null) {
		$this->isTrue         = $isTrue;
		$this->failureMessage = $failureMessage;
	}
	
	public static function assertAll(Assertion ...$assertions): Assertion {
		foreach ($assertions as $assertion) {
			if (!$assertion->isTrue())
				return $assertion;
		}
		
		return Assertion::getSuccessfulAssertion();
	}
}
