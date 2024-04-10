<?php
final class Location {
	private function __construct() { }
	
	public static function navigate(string $url): void {
		header("Location: $url");
	}
}
