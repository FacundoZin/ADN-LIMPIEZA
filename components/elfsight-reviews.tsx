"use client"

import Script from 'next/script'

export function ElfsightReviews() {
    return (
        <div className="w-full">
            <Script
                src="https://elfsightcdn.com/platform.js"
                strategy="afterInteractive"
            />
            <div
                className="elfsight-app-2fc69869-766f-4a1c-83da-05aeba416e97"
                data-elfsight-app-lazy
            ></div>
        </div>
    )
}
