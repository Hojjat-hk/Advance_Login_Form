<?php
enum ModalType {
	case Success;
	case Failure;
}

// Wrapper around the custom JavaScript showModal function
final class Modal {
	private function __construct() { }
	
	public static function display(string $message, ModalType $type = ModalType::Success): void {
		$status = $type === ModalType::Success ? "true" : "";
		echo("<script>showModal('$status', '$message');</script>");
	}
	
	public static function displayAndExit(string $message, ModalType $type = ModalType::Failure): void {
		self::display($message, $type);
		exit(/* $message */);
	}
}
