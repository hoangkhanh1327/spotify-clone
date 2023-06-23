/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/tim-kiem',
                destination: '/search',
            },
            {
                source: '/danh-sach-yeu-thich',
                destination: '/liked',
            },
            {
                source: '/thong-tin-tai-khoan',
                destination: '/account',
            },
        ];
    },
    images: {
        domains: [
            'hcxgcmnvygmbxkpixqrf.supabase.co'
        ]
    },

}

module.exports = nextConfig
