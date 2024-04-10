<?php
class DatabaseException extends Exception { }

final class Database {
	private const HOST_NAME = "localhost";
	private const USERNAME = "root";
	private const PASSWORD = "";
	private const DATABASE_NAME = "advanced_login_form";
	
	private static ?mysqli $connection = null;
	
	private function __construct() { }
	
	public static function connect(): void {
		if (self::$connection == null)
			self::$connection = new mysqli(self::HOST_NAME, self::USERNAME, self::PASSWORD, self::DATABASE_NAME);
	}
	
	public static function disconnect(): void {
		if (self::$connection != null) {
			self::$connection->close();
			self::$connection = null;
		}
	}
	
	public static function query(string $query, string $parameterFormat, mixed ...$parameters): mysqli_result|false {
		if (self::$connection == null)
			throw new DatabaseException("No connection to the database is opened yet.");
		
		$stmt = new mysqli_stmt(self::$connection, $query);
		$stmt->bind_param($parameterFormat, ...$parameters);
		
		if (!$stmt->execute())
			throw new DatabaseException("An unknown error occurred while trying to execute the specified query.");
		
		$result = $stmt->get_result();
		$stmt->close();
		
		return $result;
	}
}
