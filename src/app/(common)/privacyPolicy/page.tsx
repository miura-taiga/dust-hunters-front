export default function PrivacyPolicy() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 text-4xl font-bold text-white">
        <p
          className="mt-2 min-w-[300px] rounded-md bg-black/50 p-4 text-center text-2xl sm:mb-2 sm:text-2xl md:text-5xl"
          style={{ whiteSpace: 'nowrap' }}
        >
          プライバシーポリシー
        </p>
      </div>
      <div className="z-10 mb-10 mt-32 w-full max-w-4xl rounded-lg bg-black/70 p-8 text-white shadow-lg">
        {/* 1. 収集する情報 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">1. 収集する情報</h2>
          <p className="text-gray-200">
            本サービスでは、以下の情報を収集することがあります。
          </p>
          <ul className="mt-2 list-inside list-disc text-gray-200">
            <li>
              個人情報:
              ユーザーがアカウント登録時に提供する情報（名前、メールアドレスなど）
            </li>
            <li>
              自動収集情報:
              本サービスの利用中に自動的に収集される情報（デバイス情報、IPアドレス、クッキー情報、利用履歴など）
            </li>
            <li>
              Google Analytics情報: アクセス解析のために、Google
              Analyticsを使用して収集される情報
            </li>
          </ul>
        </section>

        {/* 2. 情報の利用目的 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">2. 情報の利用目的</h2>
          <p className="text-gray-200">
            収集した情報は、以下の目的で使用します。
          </p>
          <ul className="mt-2 list-inside list-disc text-gray-200">
            <li>本サービスの提供、運営、改善</li>
            <li>ユーザーからの問い合わせ対応</li>
            <li>サービスに関する重要な情報の提供（通知や更新情報）</li>
            <li>アクセス解析や利用傾向の調査（Google Analyticsを利用）</li>
          </ul>
        </section>

        {/* 3. クッキーの利用 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">3. クッキーの利用</h2>
          <p className="text-gray-200">
            本サービスでは、クッキーや類似の技術を使用してユーザーのアクセス情報を収集する場合があります。これにより、ユーザー体験の向上や利用状況の把握が可能となります。Google
            Analyticsの詳細については、
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              className="underline hover:text-blue-700"
            >
              Googleのプライバシーポリシー
            </a>
            をご参照ください。
          </p>
        </section>

        {/* 4. 情報の共有 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">4. 情報の共有</h2>
          <p className="text-gray-200">
            当社は、以下の場合を除き、収集した個人情報を第三者に提供することはありません。
          </p>
          <ul className="mt-2 list-inside list-disc text-gray-200">
            <li>ユーザーの同意を得た場合</li>
            <li>法令に基づき開示が求められる場合</li>
            <li>サービス提供に必要な場合（例: サーバー管理会社など）</li>
          </ul>
        </section>

        {/* 5. 安全対策 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">5. 安全対策</h2>
          <p className="text-gray-200">
            当社は、個人情報の漏えいや改ざんを防止するために、適切な技術的・組織的な安全対策を講じています。
          </p>
        </section>

        {/* 6. ユーザーの権利 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">6. ユーザーの権利</h2>
          <p className="text-gray-200">
            ユーザーは、当社が保有する自身の個人情報について、以下の権利を有します。
          </p>
          <ul className="mt-2 list-inside list-disc text-gray-200">
            <li>情報の開示、訂正、削除の請求</li>
            <li>サービス利用停止の請求</li>
          </ul>
          <p className="mt-4 text-gray-200">
            これらの権利を行使する場合、
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfF_zWzn3Im1UpxYOLms8tiZddzbD4ZIyww5i_g43NDwH67ww/viewform"
              className="underline hover:text-blue-700"
              target="_blank"
            >
              こちらにお問い合わせ
            </a>
            ください。
          </p>
        </section>

        {/* 7. 改定について */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">7. 改定について</h2>
          <p className="text-gray-200">
            当社は、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更があった場合には、ユーザーに適切に通知いたします。
          </p>
        </section>

        {/* 最終更新日など */}
        <div className="mt-8 text-sm text-gray-400">
          <p>制定日: 2024年10月22日</p>
          <p>最終更新日: 2024年10月22日</p>
        </div>
      </div>
    </div>
  );
}
