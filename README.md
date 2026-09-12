# Canton Step Guide AR

الموقع منشور على Cloudflare Pages ومربوط بمستودع GitHub للنشر التلقائي.

## الرابط النهائي

**https://apexcanton.pages.dev**

## النشر التلقائي

كل تحديث يتم رفعه إلى فرع `main` في هذا المستودع يؤدي إلى بناء ونشر نسخة جديدة تلقائيًا على Cloudflare Pages.

إعدادات البناء الحالية هي:

- **Production branch:** `main`
- **Build command:** `pnpm run build`
- **Build output directory:** `dist/public`

## طريقة تحديث النسخة سنويًا

1. عدّل ملفات الموقع داخل مجلد `client`.
2. اختبر التعديلات محليًا باستخدام:

   ```bash
   pnpm install --frozen-lockfile
   pnpm run check
   pnpm run build
   ```

3. ارفع التعديلات إلى فرع `main`:

   ```bash
   git add .
   git commit -m "Update annual site version"
   git push origin main
   ```

4. افتح لوحة Cloudflare Pages وانتظر اكتمال عملية البناء والنشر.

لا تحتاج إلى رفع ملفات `dist` يدويًا؛ Cloudflare يعيد بناء الموقع تلقائيًا من المصدر في كل تحديث على GitHub.

## المستودع

https://github.com/BenSHaker10/canton--2026

## ملاحظات مهمة

- لا تغيّر اسم مشروع Cloudflare Pages إذا أردت الاحتفاظ بالرابط `apexcanton.pages.dev`.
- لا تضع كلمات المرور أو مفاتيح API داخل GitHub.
- إذا أضيفت متغيرات بيئية مستقبلًا، أضفها من Cloudflare Pages ضمن **Settings → Variables and secrets**.
