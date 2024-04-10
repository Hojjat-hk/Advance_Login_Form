<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="author" content="Hojjat Hekmatipour">
    <link rel="stylesheet" type="text/css" href="Styles/Main.css">
    <link rel="stylesheet" type="text/css" href="Styles/Login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"/>
    <title>Real world | Login Form</title>
</head>
<body class="d-flex jst-cnt-cntr alg-itm-cntr">
    <div class="modal">
        <span>You've successfully logged in.</span>
    </div>
    <section class="login-section">

        <div class="login_left">
            <img src="Asset/Pic/Login-Art.svg" alt="Login Picture">
        </div>

        <form class="login_right form" action="<?php echo(htmlspecialchars("Login.php")); ?>" method="post">
            <h2 class="login-header">Log In</h2>
            <div class="input-container d-flex alg-itm-cntr jst-cnt-cntr">
                <div class="input-filed d-flex jst-cnt-cntr">
                    <label for="usernameLoginInput">Email</label>
                    <input type="email" placeholder="Enter Text . ." id="usernameLoginInput" name="usernameLoginInput" autofocus minlength="7" maxlength="254" required autocomplete="off">
                </div>
                <div class="input-filed d-flex jst-cnt-cntr">
                    <label for="passwordLoginInput">Password</label>
                    <input type="password" placeholder="Enter Text . ." id="passwordLoginInput" name="passwordLoginInput" autofocus minlength="8" maxlength="16" required autocomplete="off">
                    <i 	class="passwordEye far fa-eye-slash"></i>
                </div>
            </div>
            <div class="forget-remember_container d-flex alg-itm-cntr">
                <div class="remember-container d-flex alg-itm-cntr">
                    <input type="checkbox" id="rememberMeLogin">
                    <label for="rememberMeLogin">Remember me</label>
                </div>
                <div class="forget-container d-flex alg-itm-cntr">
                    <a href="#" id="forgetMyPassword">Forgot your password?</a>
                </div>
            </div>
            <button type="button" class="login-submit-btn">
                <div id="btnCircleScale"></div>
                <span>Sign In</span>
            </button>
            <hr class="hr-elem">
            <div class="login-via-another_container d-flex alg-itm-cntr">
                <h2 class="login-header">Log in via</h2>
                <div class="social-container d-flex jst-cnt-cntr alg-itm-cntr">
                    <div class="d-flex jst-cnt-cntr alg-itm-cntr"><img src="Asset/Pic/Facebook.svg" alt="Facebook Logo"></div>
                    <div class="d-flex jst-cnt-cntr alg-itm-cntr"><img src="Asset/Pic/Google.svg" alt="Google Logo"></div>
                    <div class="d-flex jst-cnt-cntr alg-itm-cntr"><img src="Asset/Pic/Apple.svg" alt="Apple Logo"></div>
                </div>
            </div>
            <div id="createAccount" class="d-flex alg-itm-cntr jst-cnt-cntr">
                <span>Don’t have an account?</span>
                <a href="Register.php" style="color:#000;"><b><u>Create Account</u></b></a>
            </div>
        </form>

    </section>
    <script type="application/javascript" src="Scripts/Main.js"></script>
    <script type="application/javascript" src="Scripts/Login.js"></script>
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

validateInput();
sanitizeInput();
$user = null;

try {
	Database::connect();
	
	$result = Database::query("SELECT * FROM user WHERE Email = ?;", "s", $_POST["usernameLoginInput"]);
	
	if ($result->num_rows === 0)
		Modal::displayAndExit("No user with such email exists.");
	
	$row = $result->fetch_assoc();
	
	if (!password_verify($_POST["passwordLoginInput"], $row["Password"]))
		Modal::displayAndExit("The entered password is incorrect.");
	
	$user = new User($row["ID"], $row["Firstname"], $row["Lastname"], $row["Email"], $row["Password"], false);
	Database::disconnect();
}
catch (Exception $ex) {
	Modal::displayAndExit("An error occurred whilst trying to communicate with the database ({$ex->getMessage()}).");
}

session_start();
$_SESSION[User::class] = $user;

Location::navigate("Success/Login-Successful.php");

function validateInput(): void {
	if (!InputManager::areAllSet(ArrayName::Post, "usernameLoginInput", "passwordLoginInput"))
		Modal::displayAndExit("Please fill all fields properly.");
	
	$assertionResult = InputManager::validateInput(
		new InputInfo($_POST["usernameLoginInput"], "Email", 7, 254, User::EMAIL_REGEX_PATTERN, "The entered email is invalid."),
		new InputInfo($_POST["passwordLoginInput"], "Password", 8, 16)
	);
	
	if (!$assertionResult->isTrue()) {
		Modal::displayAndExit($assertionResult->getFailureMessage());
	}
}

function sanitizeInput(): void {
	InputManager::sanitizeAll(ArrayName::Post, "usernameLoginInput");
}

// Access this project: https://github.com/Hojjat-hk/
