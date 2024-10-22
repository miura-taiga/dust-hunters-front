import Link from 'next/link';

export default function TermOfService() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 text-4xl font-bold text-white">
        <p
          className="mt-2 min-w-[300px] rounded-md bg-black/50 p-4 text-center text-2xl sm:mb-2 sm:text-2xl md:text-5xl"
          style={{ whiteSpace: 'nowrap' }}
        >
          利用規約
        </p>
      </div>
      <div className="z-10 mb-10 mt-32 w-full max-w-4xl rounded-lg bg-black/70 p-8 text-white shadow-lg">
        {/* 1. はじめに */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">1. はじめに</h2>
          <p className="text-gray-200">
            本利用規約（以下、「本規約」）は、<strong>DustHunters</strong>
            （以下、「本アプリ」）を提供する三浦大河（以下、「当社」）が、本アプリの利用条件を定めるものです。利用者（以下、「ユーザー」）は、本規約に同意した上で本アプリを利用するものとします。
          </p>
        </section>

        {/* 2. アカウントの作成と管理 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">2. アカウントの作成と管理</h2>
          <ul className="list-inside list-disc text-gray-200">
            <li>
              本アプリを利用するためには、ユーザーはアカウントを作成する必要があります。
            </li>
            <li>
              ユーザーは、登録情報が正確であることを保証し、情報に変更が生じた場合は速やかに更新するものとします。
            </li>
            <li>
              アカウントの管理責任はユーザーにあり、不正使用があった場合、ユーザーはその責任を負います。
            </li>
          </ul>
        </section>

        {/* 3. 禁止事項 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">3. 禁止事項</h2>
          <p className="text-gray-200">
            ユーザーは以下の行為を行ってはなりません。
          </p>
          <ul className="mt-2 list-inside list-disc text-gray-200">
            <li>違法行為や犯罪行為の助長</li>
            <li>当社または第三者の知的財産権を侵害する行為</li>
            <li>他のユーザーのプライバシーを侵害する行為</li>
            <li>アプリの改ざん、リバースエンジニアリングなど</li>
            <li>スパム、フィッシング、詐欺行為</li>
            <li>虚偽の情報登録や不正アクセス、ボットの使用</li>
          </ul>
        </section>

        {/* 4. 免責事項 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">4. 免責事項</h2>
          <p className="text-gray-200">
            当社は、本アプリがユーザーの特定の目的に適合することや、エラーや中断がないことを保証するものではありません。
            本アプリの利用により生じたいかなる損害に対しても、当社は一切の責任を負いません。また、当社は、第三者による不正行為や本規約の範囲外で生じた損害に対して責任を負いません。
          </p>
        </section>

        {/* 5. 知的財産権 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">5. 知的財産権</h2>
          <p className="text-gray-200">
            本アプリに関連するすべてのコンテンツ、ソフトウェア、技術、商標、ロゴ、その他の知的財産権は、当社またはそのライセンサーに帰属します。
            ユーザーは、当社の事前の書面による同意なく、これらの知的財産権を使用、複製、配布、改変することはできません。
          </p>
        </section>

        {/* 6. プライバシーポリシー */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">6. プライバシーポリシー</h2>
          <p className="text-gray-200">
            本アプリにおける個人情報の取り扱いについては、別途定める
            <Link
              href="/privacyPolicy"
              className="underline hover:text-gray-600"
            >
              プライバシーポリシー
            </Link>
            に従うものとします。
          </p>
        </section>

        {/* 7. 利用の停止および契約解除 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">
            7. 利用の停止および契約解除
          </h2>
          <p className="text-gray-200">
            当社は、ユーザーが本規約に違反した場合、事前の通知なしにアカウントを停止または削除する権利を有します。
            ユーザーは、アカウントの削除を希望する場合、所定の手続きを経ていつでもアカウントを削除できます。
          </p>
        </section>

        {/* 8. 規約の変更 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">8. 規約の変更</h2>
          <p className="text-gray-200">
            当社は、必要に応じて本規約を変更できるものとします。変更後の規約は、本アプリ上で通知された時点で効力を持つものとします。
            ユーザーが変更後も本アプリを利用した場合、変更内容に同意したものとみなされます。
          </p>
        </section>

        {/* 9. 準拠法および裁判管轄 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">9. 準拠法および裁判管轄</h2>
          <p className="text-gray-200">
            本規約は、日本法に基づいて解釈されます。本規約に関して生じた紛争については、札幌地方裁判所を専属的な管轄裁判所とします。
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
