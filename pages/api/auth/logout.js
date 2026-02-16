
export default async function logout (req, res) {
    res.setHeader('Set-Cookie', ['token=deleted', 'email=deleted']);
    try {
        return res.status(200).json({message: "Logout", token: "deleted", email: "deleted"})
    }
    catch (error) {
        return res.status(500).json({message: error, token: "deleted", email: "deleted"})
    }
}
