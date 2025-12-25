import express from "express";
const router = express.Router();
let signupList = [];

function validatePayload(body) {
  const errors = {};

  if (!body.name || body.name.trim() === "") {
    errors.name = "姓名不可空白";
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.email = "Email 格式不正確";
  }
  if (!body.phone || !/^[0-9]{10}$/.test(body.phone)) {
    errors.phone = "手機格式錯誤需為10位數字";
  }
  if (!body.password || body.password.length < 8) {
    errors.password = "密碼至少 8 碼";
  }
  if (body.password !== body.confirmPassword) {
    errors.confirmPassword = "密碼與確認密碼不一致";
  }
  if (!Array.isArray(body.interests) || body.interests.length === 0) {
    errors.interests = "至少需要一個興趣";
  }

  return errors;
}
router.post("/", (req, res) => {
  const errors = validatePayload(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: errors });
  }

  signupList.push({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    interests: req.body.interests,
    time: new Date().toISOString(),
  });

  return res.json({ message: "註冊成功", total: signupList.length });
});
router.get("/", (req, res) => {
  res.json({
    total: signupList.length,
    list: signupList,
  });
});

export default router;