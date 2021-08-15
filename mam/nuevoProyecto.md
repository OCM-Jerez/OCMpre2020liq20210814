- Copiar y pegar styles.scss
- Copiar y pegar index.html
- Copiar y pegar carpeta src/app/gastos
- Copiar y pegar carpeta src/app/indice
- Copiar y pegar carpeta src/app/ingresos
- Copiar y pegar carpeta src/app/indice
- Copiar y pegar carpeta src/app/scss
- Copiar y pegar carpeta src/app/services
- Copiar y pegar carpeta src/app/shared
- Copiar y pegar screen-size.enum.ts
- Añadir carpeta data en src/assets
- Copiar JSON
- Copiar localeTextESPes.json
- Copiar carpeta img en src/assets
- Añadir carpeta js en src/assets
- En global-constants.ts cambiar nombre JSON

- Copiar y pegar codigo en app-routing.module.ts
- Copiar y pegar en tsconfig.json

        ⋅⋅⋅"paths": {
        ⋅⋅⋅    "@presu/json/*": [
        ⋅⋅⋅      "src/assets/data/*"
        ⋅⋅⋅    ],
        ⋅⋅⋅    "@presu/shared/*": [
        ⋅⋅⋅      "src/app/shared/*"
        ⋅⋅⋅    ]
        ⋅⋅⋅  },

        ⋅⋅⋅"resolveJsonModule": true,
        ⋅⋅⋅"allowSyntheticDefaultImports": true,
        ⋅⋅⋅"typeRoots": [
        ⋅⋅⋅"node_modules/@types"
        ⋅⋅⋅],

- En package.json añadir: 

        ⋅⋅⋅ "@ng-select/ng-select": "^3.7.3",
        ⋅⋅⋅ "ag-grid-angular": "^24.1.0",
        ⋅⋅⋅ "ag-grid-community": "^24.1.0",
        ⋅⋅⋅ "ag-grid-enterprise": "^24.1.0"

- mpm install
- Si no reconoce alguna referencia vover a correr npm install

- ng s -o
