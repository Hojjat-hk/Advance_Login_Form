<?php declare(strict_types=1); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="author" content="Hojjat Hekmatipour">
    <link rel="stylesheet" type="text/css" href="Styles/Main.css">
    <link rel="stylesheet" type="text/css" href="Styles/Register.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"/>
    <title>Real world | Registration Form</title>
</head>
<body class="d-flex jst-cnt-cntr alg-itm-cntr">
<div class="modal">
    <span>Your login was successful</span>
</div>
<section class="login-section">
    <div class="login_left">
        <img src="Asset/Pic/Login-Art2.svg" alt="Login Picture">
    </div>

    <form class="login_right form" action="<?php echo(htmlspecialchars("Register.php")); ?>" method="post">
        <h2 class="login-header">Sign Up</h2>
        <div class="input-container">
            <div class="input-filed d-flex jst-cnt-cntr">
                <label for="userFirstNameInput">Firstname</label>
                <input data-name="firstName" type="text" placeholder="Enter Text . ." id="userFirstNameInput" name="userFirstNameInput" autofocus minlength="2" maxlength="30" required autocomplete="off">
            </div>
            <div class="input-filed d-flex jst-cnt-cntr">
                <label for="userLastNameInput">Lastname</label>
                <input data-name="lastName" type="text" placeholder="Enter Text . ." id="userLastNameInput" name="userLastNameInput" autofocus minlength="2" maxlength="30" required autocomplete="off">
            </div>
            <div class="input-filed d-flex jst-cnt-cntr">
                <label for="emailRegisterInput">Email Address</label>
                <input data-name="emailAddress" type="text" placeholder="Enter Text . ." id="emailRegisterInput" name="emailRegisterInput" autofocus minlength="7" maxlength="254" required autocomplete="off">
            </div>
            <div class="input-filed d-flex jst-cnt-cntr">
                <label for="passwordStepOne">Enter Password</label>
                <input data-name="passStep1" type="password" placeholder="Enter Text . ." id="passwordStepOne" name="passwordStepOne" autofocus minlength="8" maxlength="16" required autocomplete="off">
                <i 	class="passwordEye far fa-eye-slash"></i>
            </div>
            <div class="input-filed d-flex jst-cnt-cntr">
                <label for="passwordStepTwo">Re-enter Password</label>
                <input data-name="passStep2" type="password" placeholder="Enter Text . ." id="passwordStepTwo" name="passwordStepTwo" autofocus minlength="8" maxlength="16" required autocomplete="off">
                <i 	class="passwordEye far fa-eye-slash"></i>
            </div>
        </div>
        <div class="rule_container d-flex alg-itm-cntr">
            <input type="checkbox" id="acceptRule" name="acceptRule">
            <label for="acceptRule">By clicking on verify you agree with the terms & conditions of the organization.</label>
        </div>
        <button type="button" class="login-submit-btn">
            <div id="btnCircleScale"></div>
            <span>Register Account</span>
        </button>
    </form>
</section>
	<!-- 'defer' has to be disabled in order for JavaScript to recognize functions after submitting the form. Look for a workaround if this is causing issues -->
    <script type="application/javascript" src="Scripts/Main.js"></script>
    <script type="application/javascript" src="Scripts/Register.js"></script>
</body>
</html>

<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST")
	exit();

require_once("Classes/InputManager.php");
require_once("Classes/Database.php");
require_once("Classes/Location.php");
require_once("Classes/User.php");
require_once("Classes/Modal.php");

const SAFE_VARIABLE_NAMES = ["userFirstNameInput", "userLastNameInput", "emailRegisterInput", "acceptRule"];
const VARIABLE_NAMES = [...SAFE_VARIABLE_NAMES, "passwordStepOne", "passwordStepTwo"];

validateInput();
sanitizeInput();

$getUserResultByEmail = fn(string $email): mysqli_result => Database::query("SELECT * FROM user WHERE Email = ?;", "s", $email);
$user = new User(null, $_POST["userFirstNameInput"], $_POST["userLastNameInput"], $_POST["emailRegisterInput"], $_POST["passwordStepOne"]);

try {
	Database::connect();
	
	if ($getUserResultByEmail($user->getEmail())->num_rows > 0)
		Modal::displayAndExit("This email is already in use by another user.");
	
	Database::query("INSERT INTO user VALUES (NULL, ?, ?, ?, ?);", "ssss",
		$user->getFirstname(), $user->getLastname(), $user->getEmail(), $user->getPassword()
	);
	
	$row = $getUserResultByEmail($user->getEmail())->fetch_assoc();
	$user = new User($row["ID"], $row["Firstname"], $row["Lastname"], $row["Email"], $row["Password"], false);
	
	Database::disconnect();
}
catch (Exception $ex) {
	Modal::displayAndExit("An error occurred whilst trying to communicate with the database ({$ex->getMessage()}).");
}

session_start();
$_SESSION[User::class] = $user;

Location::navigate("Success/Registration-Successful.php");

function validateInput(): void {
	if (!InputManager::areAllSet(ArrayName::Post, ...VARIABLE_NAMES))
		Modal::displayAndExit("Please fill all fields properly.");
	
	$getInvalidInputMessage = fn(string $fieldName): string => "The entered $fieldName is invalid.";
	
	$resultAssertion = InputManager::validateInput(
		new InputInfo($_POST["userFirstNameInput"], "Firstname", 2, 30, User::NAME_REGEX_PATTERN, $getInvalidInputMessage("firstname")),
		new InputInfo($_POST["userLastNameInput"], "Lastname", 2, 30, User::NAME_REGEX_PATTERN, $getInvalidInputMessage("lastname")),
		new InputInfo($_POST["emailRegisterInput"], "Email", 7, 254, User::EMAIL_REGEX_PATTERN, $getInvalidInputMessage("email")),
		new InputInfo($_POST["passwordStepOne"], "Password", 8, 16),
		new InputInfo($_POST["passwordStepTwo"], "Confirmation password", 8, 16)
	);
	
	if (!$resultAssertion->isTrue())
		Modal::displayAndExit($resultAssertion->getFailureMessage());
	
	if ($_POST["passwordStepOne"] !== $_POST["passwordStepTwo"])
		Modal::displayAndExit("Please ensure your password matches the confirmation password.");
}

function sanitizeInput(): void {
	InputManager::sanitizeAll(ArrayName::Post, ...SAFE_VARIABLE_NAMES);
}

// Access this project: https://github.com/Hojjat-hk/
