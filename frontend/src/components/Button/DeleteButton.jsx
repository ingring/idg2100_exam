import './button.css';
import useAxiosPrivate from '../../functions/useAxiosPrivate';
import { useNavigate } from "react-router-dom";

function DeleteButton({ url }) {
    const navigate = useNavigate()

    const axiosPrivate = useAxiosPrivate();

    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(url)

            navigate('/matches');
        }
        catch (err) { console.log(err) }
    }

    return (
        <button onClick={handleDelete} className='deletebtn'>
            <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 0C6.2685 0 0 5.75205 0 12.8466C0 19.9411 6.2685 25.6931 14 25.6931C21.7315 25.6931 28 19.9411 28 12.8466C28 5.75205 21.7315 0 14 0ZM15.6497 12.8466C15.6497 12.8466 19.3118 16.207 19.4915 16.3719C19.9477 16.7904 19.9477 17.4681 19.4915 17.8856C19.0353 18.3042 18.2968 18.3042 17.8418 17.8856C17.6622 17.7218 14 14.3603 14 14.3603C14 14.3603 10.3378 17.7208 10.1582 17.8856C9.702 18.3042 8.9635 18.3042 8.5085 17.8856C8.05233 17.467 8.05233 16.7894 8.5085 16.3719C8.687 16.207 12.3503 12.8466 12.3503 12.8466C12.3503 12.8466 8.68817 9.48611 8.5085 9.32125C8.05233 8.90266 8.05233 8.22501 8.5085 7.8075C8.96467 7.38891 9.70317 7.38891 10.1582 7.8075C10.3378 7.97129 14 11.3328 14 11.3328C14 11.3328 17.6622 7.97236 17.8418 7.8075C18.298 7.38891 19.0365 7.38891 19.4915 7.8075C19.9477 8.22608 19.9477 8.90373 19.4915 9.32125C19.313 9.48611 15.6497 12.8466 15.6497 12.8466Z" fill="#F19090" />
            </svg>
            <p>Delete</p>
        </button>
    )

}

export default DeleteButton;