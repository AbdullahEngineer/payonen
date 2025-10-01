const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();

// إعدادات Express لتعامل مع JSON
app.use(bodyParser.json());

// نقطة النهاية للتحقق من الدفع
app.post('/charge', async (req, res) => {
  const paymentResult = req.body.paymentResult; // النتيجة القادمة من الواجهة الأمامية

  try {
    // إرسال بيانات الدفع إلى Moyasar API للتحقق
    const response = await fetch('https://api.moyasar.com/v1/payments/verify', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer your_secret_key_here', // استبدل بـ مفتاح الـ secret الخاص بـ Moyasar
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_id: paymentResult.payment_id, // استخدم الـ payment_id من النتيجة
      }),
    });

    const result = await response.json();

    if (result.status === 'succeeded') {
      res.json({ success: true }); // إذا كان الدفع ناجحًا
    } else {
      res.json({ success: false }); // إذا فشل الدفع
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});

// بدء السيرفر على المنفذ 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
