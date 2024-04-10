<?php
declare(strict_types=1);
require_once("../Classes/Session.php");

Session::navigateIfSessionIsInvalid("../Login.php");

// TODO: Extend behavior if necessary
session_unset();
session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="author" content="Hojjat Hekmatipour">
    <link rel="stylesheet" type="text/css" href="../Styles/Registration-Successful.css">
    <link rel="stylesheet" type="text/css" href="../Styles/Main.css">
    <title>Real world | Registration successful</title>
</head>
<body class="d-flex jst-cnt-cntr alg-itm-cntr">
    <section class="container d-flex jst-cnt-cntr alg-itm-cntr">
        <div class="successful-picture">
            <img src="../Asset/Pic/Correct-tick.svg" alt="successful picture">
        </div>
        <h3 class="successful-text">
            Account created
            <br>
            successfully.
        </h3>
        <p>Verification code has been sent <br> to the provided email. <a href="https://github.com">Verify now.</a></p>
        <a href="../Login.php">
            <button class="send-login">
                <div id="btnCircleScale"></div>
                <span>Log In Now</span>
            </button>
        </a>
    </section>
</body>
</html>
<!--Access to this project : https://github.com/Hojjat-hk /-->
