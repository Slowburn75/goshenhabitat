import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                projects: 'projects/index.html',
                about: 'about/index.html',
                residential_villa: 'projects/residential-villa/index.html',
                commercial_complex: 'projects/commercial-complex/index.html',
                hospitality_resort: 'projects/hospitality-resort/index.html',
                institutional_building: 'projects/institutional-building/index.html',
                renovation_project: 'projects/renovation-project/index.html',
                engineering_infrastructure: 'projects/engineering-infrastructure/index.html',
                conference_center: 'projects/conference-center/index.html',
                residential_mowe: 'projects/residential-mowe/index.html',
                residential_monrovia: 'projects/residential-monrovia/index.html',
                catholic_church_gbagada: 'projects/catholic-church-gbagada/index.html',
                nem_quarters: 'projects/nem-quarters/index.html',
                amazing_grace_house: 'projects/amazing-grace-house/index.html',
                mixed_housing_agungi: 'projects/mixed-housing-agungi/index.html',
            },
        },
    },
})
