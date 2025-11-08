// API route to verify admin password
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { password } = req.body;
  const correctPassword = process.env.ADMIN_PASS;

  if (password === correctPassword) {
    return res.status(200).json({ success: true, message: "Password correct" });
  } else {
    return res.status(401).json({ success: false, error: "Wrong password" });
  }
}
