// this component was brought over from oblig 3
import './footer.css'

function Footer() {
    return (
        <div>
        <hr />
        <footer>
            <section className='footer-left'>
                <p>NTNU Ping Pong League</p>
                <p>2023</p>
            </section>
            <section className='footer-right'>
                <p>IDG2100 Full-stack webutvikling</p>
                <p>Simen Frogner Hellesnes, Trym Simensen Nerem and Ingrid Gladheim</p>
            </section>
        </footer>
        </div>
    );
}
 
export default Footer;