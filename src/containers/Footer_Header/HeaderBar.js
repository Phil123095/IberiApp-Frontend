import IberiAppLogo from '../../Iberia.png';


function HeaderBar(props) {
    function handleLogOut() {
        props.removeToken()
    }

    function noLoginHeader() {
        return (
            <div class="flex w-fit flex-grow justify-end">
                <div class="text-sm justify-end align-items-center mr-2 hover:no-underline">
                    <a href="/signup" class="inline-block my-4 mx-2 align-center text-white rounded hover:no-underline">
                        Register
                    </a>
                    <a href="/login"  class="inline-block my-4 mx-2 align-center text-white hover:no-underline">
                        Login
                    </a>
                </div>

            </div>
        )
    }

    function LoggedInHeader() {
        return (
            <div class="flex w-fit flex-grow justify-end">
                <div class="text-sm justify-end align-items-center mr-2 hover:no-underline">
                    <a href="/dashboard" class="inline-block my-4 mx-2 align-center text-white rounded hover:no-underline">
                        Dashboard
                    </a>
                    <a href="/file-upload" class="inline-block my-4 mx-2 align-center text-white rounded hover:no-underline">
                        Upload File
                    </a>
                    <a href="/" onClick={handleLogOut} class="inline-block my-4 mx-2 align-center text-white hover:no-underline">
                        Logout
                    </a>
                </div>
            </div>
        )
    }

    return (
        <header class="w-full">
            <nav class="flex min-w-full items-center justify-between flex-wrap bg-slate-800">
                <a href="/" class="flex items-center flex-shrink-0 text-white mx-6 hover:no-underline"> 
                    <span class="font-semibold text-xl tracking-tight hover:font-bold">IberiApp</span>
                    <img class="fill-current h-10 w-10 ml-0.5" src={IberiAppLogo} alt="Logo"/>
                </a>
                {!props.token || props.token ==="" ? noLoginHeader() : LoggedInHeader()}
            </nav>
        </header>
    )
}

export default HeaderBar;