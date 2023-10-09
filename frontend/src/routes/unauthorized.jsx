import LinkTo from "../components/LinkTo/LinkTo";

function Unauthorized (){
    return (
        <main className="unauthorized">
            <div>
                <h1>Ooops!</h1>
                <p>You don't have access to this page.</p>
                <LinkTo to='/' value='Go to front page' />
                {/* <LinkTo to='login' value='Login' /> */}
            </div>
        </main>
    )
}

export default Unauthorized;