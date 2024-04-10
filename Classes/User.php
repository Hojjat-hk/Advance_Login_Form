<?php
class User {
	public const NAME_REGEX_PATTERN = "/^[A-Za-zÀ-ÖØ-öø-ÿءآ-ی ‌]+$/u";
	public const EMAIL_REGEX_PATTERN = "/^[A-Za-z0-9.+\-_~!#$%&‘'\/=^{}|*?`]+@[A-Za-z0-9][A-Za-z0-9-]*(?:\.[A-Za-z0-9-]+)+[A-Za-z0-9]$/";
	
	private const PASSWORD_ALGORITHM = PASSWORD_DEFAULT;
	
	private ?int $id;
	private string $firstname;
	private string $lastname;
	private string $email;
	private string $password;
	
	public function getId(): ?int {
		return $this->id;
	}
	
	public function getFirstname(): string {
		return $this->firstname;
	}
	
	public function getLastname(): string {
		return $this->lastname;
	}
	
	public function getEmail(): string {
		return $this->email;
	}
	
	public function getPassword(): string {
		return $this->password;
	}
	
	public function __construct(?int $id, string $firstname, string $lastname, string $email, string $password, bool $hashPassword = true) {
		$this->id        = $id;
		$this->firstname = $firstname;
		$this->lastname  = $lastname;
		$this->email     = $email;
		$this->password  = $hashPassword ? password_hash($password, self::PASSWORD_ALGORITHM) : $password;
	}
}
