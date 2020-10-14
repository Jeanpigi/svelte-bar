<script>
    import { auth } from "../lib/firebase";
    import { navigate } from "svelte-routing";
    import { user } from "../lib/store.js";

    import toastr from "toastr";

    let email = "";
    let password = "";

    // Destructuring to obtain email and password from form via Event
    const signIn = async (e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password).then(() => {
                let firebaseUser = auth.currentUser;
                if (firebaseUser) {
                    let { email } = firebaseUser;
                    user.set({ ...$user, loggedIn: true, email });
                    toastr.success("Sesion iniciada exitosamente", {
                        closeButton: false,
                        debug: false,
                        newestOnTop: false,
                        progressBar: true,
                        positionClass: "toast-top-full-width",
                        preventDuplicates: false,
                        onclick: null,
                        showDuration: 300,
                        hideDuration: 1000,
                        timeOut: 5000,
                        extendedTimeOut: 1000,
                        showEasing: "swing",
                        hideEasing: "linear",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut",
                    });
                    navigate("/dashBoard", { replace: true });
                }
            });
        } catch (error) {
            toastr.error(`No se puedo iniciar sesion por el error ${error}`, {
                closeButton: false,
                debug: false,
                newestOnTop: false,
                progressBar: true,
                positionClass: "toast-top-full-width",
                preventDuplicates: false,
                onclick: null,
                showDuration: 300,
                hideDuration: 1000,
                timeOut: 5000,
                extendedTimeOut: 1000,
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
            });
            navigate("/", { replace: true });
        }
    };
</script>

<style>
    .login {
        margin-top: 20px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
    }

    .login_container {
        background-color: #f7f7f7;
        color: #000000;
        width: 300px;
        height: fit-content;
        border-radius: 5px;
        border: 1px solid #f7f7f7;
        padding: 20px;
    }

    .login_container > form > label {
        margin: 5px;
    }
    .login_container > form > input {
        height: 30px;
        margin: 10px 5px;
        background-color: white;
        width: 98%;
    }

    .login_signInButton {
        background-color: #ed495a;
        color: white;
        border-radius: 2px;
        width: 100%;
        height: 30px;
        border: 1px solid;
        margin-top: 10px;
        border-color: #ce0a04 #ed495a rgb(250, 19, 19);
    }
</style>

<div class="login">
    <div class="login_container">
        <form>
            <label for="email">Email</label>
            <input type="email" name="email" bind:value={email} />

            <label for="password">Password</label>
            <input type="password" name="password" bind:value={password} />

            <button
                class="login_signInButton"
                type="button"
                on:click={signIn}>Login</button>
        </form>
    </div>
</div>
