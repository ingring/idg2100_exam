import './button.css';
import { useNavigate } from "react-router-dom";

function EditButton({ url }) {
    const navigate = useNavigate()


    const handleEdit = async () => {
        try {

            navigate(`${url}`);
        }
        catch (err) { console.log(err) }
    }

    return (
        <button onClick={handleEdit} className='editbtn'>
            <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.8281 3.16315C22.3164 3.16315 21.8046 3.36921 21.4141 3.78095L19 6.32628L24 11.5982L26.4141 9.05283C27.1951 8.22936 27.1951 6.89439 26.4141 6.07092L24.2422 3.78095C23.8517 3.36921 23.3399 3.16315 22.8281 3.16315ZM17 8.43503L5.25977 20.8137C5.25977 20.8137 6.17753 20.727 6.51953 21.0876C6.86153 21.4481 6.58 23.8078 7 24.2507C7.42 24.6935 9.64389 24.3818 9.96289 24.7181C10.2819 25.0545 10.2598 26.0855 10.2598 26.0855L22 13.7069L17 8.43503ZM4 24.2507L3.05664 27.0678C3.01956 27.179 3.00041 27.296 3 27.4138C3 27.6934 3.10536 27.9616 3.29289 28.1594C3.48043 28.3571 3.73478 28.4682 4 28.4682C4.11177 28.4678 4.22268 28.4476 4.32812 28.4085C4.33139 28.4071 4.33464 28.4057 4.33789 28.4043L4.36328 28.3961C4.36524 28.3947 4.36719 28.3934 4.36914 28.392L7 27.4138L5.5 25.8322L4 24.2507Z" fill="#3b6585" />
            </svg>

            <p>Edit</p>
        </button>
    )

}

export default EditButton;