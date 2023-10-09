import LinkTo from "../components/LinkTo/LinkTo";

function PageNotFound (){
    return (
        <main className="pageNotFound">
            <div>
                <h1>This page doesn't exist</h1>
                <LinkTo to='/' value='Go to front page' />
            </div>
        </main>
    )
}

export default PageNotFound;