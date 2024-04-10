<?php
require_once("../Classes/Location.php");
require_once("../Classes/User.php");

final class Session {
	private function __construct() { }
	
	public static function navigateIfSessionIsInvalid(string $url): void {
		session_start();
		
		if (!isset($_SESSION[User::class]))
			Location::navigate("$url");
	}
}
