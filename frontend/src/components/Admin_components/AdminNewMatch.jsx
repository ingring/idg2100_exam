import AdminCreateMatch from "../Forms/AdminCreateMatch"
function AdminNewMatch() {
    let edit = false

    return (
        <main className='form-page'>
            <AdminCreateMatch edit={edit} />
        </main>
    )

}

export default AdminNewMatch