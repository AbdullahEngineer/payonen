document.addEventListener("DOMContentLoaded", function () {
    var checkout = new MoyasarCheckout({
        key: "pk_test_jWdZSFixbTLFb4x41CiUhGE9uA4ogUxiFShxV76c", // استبدل بـ مفتاح الـ public الخاص بـ Moyasar
        amount: 1000, // المبلغ المطلوب (بالريال السعودي أو العملة المطلوبة)
        currency: "SAR", // العملة
        order_id: "order_id_12345", // معرف الطلب (يمكنك تغييره ليكون معرف فريد لكل طلب)
        description: "دفع لخدمة معينة",
        success_url: "https://your-site.com/success", // رابط عند نجاح الدفع
        failure_url: "https://your-site.com/failure", // رابط عند فشل الدفع
    });

    // إظهار زر الدفع في الصفحة
    checkout.show('payment-button');

    // عند اكتمال الدفع
    checkout.on('payment.completed', function(result) {
        console.log(result); // عرض النتيجة في وحدة التحكم

        // إرسال النتيجة إلى الخادم للتحقق
        fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentResult: result })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('تم الدفع بنجاح!');
              } else {
                  alert('فشلت عملية الدفع');
              }
          });
    });

    // عند فشل الدفع
    checkout.on('payment.failed', function(error) {
        document.getElementById('error-message').textContent = 'فشلت عملية الدفع: ' + error.message;
    });
});
