Abrir Excel original
Guardar como Excel publicado terminando en OCM.
Guardar como xlsx
Eliminar 2ª fila de cabecera, la que asigna letras a las columnas (a), (b) c=a+b ............
Eliminar fila totales.
Renombrar
Org. -> CodOrg
Pro. -> CodPro
Eco. -> CodEco
Añadir columna:
CodCap
DesCap
DesOrg
DesPro
DesEco

Cambiar a tipo numero, 0 decimales, sin separador de miles, las columnas:
CodOrg
CodPro
CodEco
CodCap

Extraer primer caracter de "Eco." en columna creada CodCap. =IZQUIERDA(D2;1)
Abrir Tabla organicos 2019.xlsx
formula BUSCARV(VALOR(X)......;2;0)
Es importante que el ultimo valor sea 0 para que sea busqueda exacta y en caso de faltar algun valor en la tabla de #N/D

Hacer lo mismo para DesCap, DesEco y DesPro abriendo sus correspondientes ficheros.

Cambiar nombres que contengan un . de lo contrario no se muestran los valores en ag-grid.
Saldo de Gastos Compromet. => Saldo de Gastos Comprometidos
Facturas consumen disp. Pend. Contabilizar => Facturas consumen disp Pend Contabilizar
Saldo de Acuerd. Créd. para No Disponibil. => Saldo de Acuerdo Créditos para No Disponibilidad
Saldo de Créditos Retenidos para Trans. => Saldo de Créditos Retenidos para Trans
Saldo de Créditos disp. a nivel de Vinculación => Saldo de Créditos disp a nivel de vinculación
Grabar.

Archivo->guardar como->desplegable tipo archivo-> CSV UTF-8 (delimitado por comas) (\*.csv)
Si no se hace como UTF-8 el json contendra simbolos extraños.  
Guardar como 202020210507EjeGas
2020 año del presupuesto
20210507 fecha ejecucion

En el CSV generado revisar todas las columnas numericas.
Las pongo como numero, decimales=0, sin separador de miles.
Los porcentajes = porcentaje, dos decimales.

**\*\***\*\*\***\*\*** INGRESOS **\*\*\*\***\*\*\*\***\*\*\*\***
Renombreo columna Eco. -> CodEco
Inserto columna DesEco.
formula BUSCARV(VALOR(X)......;2;0)
Es importante que el ultimo valor sea 0 para que sea busqueda exacta y en caso de faltar algun valor en la tabla de #N/D
Insertar columnas\_
CodCap
DesCap

Archivo->guardar como->desplegable tipo archivo-> CSV UTF-8 (delimitado por comas) (\*.csv)
Si no se hace como UTF-8 el json contendra simbolos extraños.  
Guardar como 202020210507EjeGas
2020 año del presupuesto
20210507 fecha ejecucion
En el CSV generado revisar todas las columnas numericas.
Las pongo como numero, decimales=0, sin separador de miles.
Los porcentajes = porcentaje, dos decimales.

**\*\*\*\***\*\*\*\***\*\*\*\*** ANGULAR ****\*\*\*\*****\*\*****\*\*\*\*****\*\*\*****\*\*\*\*****\*\*****\*\*\*\*****
Copio y pego carpeta anterior.
Renombro carpeta
Renombro todas las cadenas del nombre anterior con el actual
Da problemas con el nombre del repositorio, conserva el anterior.
Borro carpeta .git, abriendo consola de git y haciendo rm -rf .git

\***\*\*\*\*\***\*\***\*\*\*\*\*** GENERAR JSON ****\*\*****\*\*****\*\*****\*\*\*****\*\*****\*\*****\*\*****
https://www.csvjson.com/csv2json
Options: Parse numbers y array.
Download.
Si esta abierto VS Code lo abre en el..
Tambien lo pone en C>:...Download
Lo genera con el nombre csvjson.json
Guardar como desde VS Code.
Le cambio el nombre = al csv

Copiarlo a src/assets de la app
Cambiar nombres en :
..\src\app\shared\global-constants.ts
public static jsonGastos = '../../../assets/data/20201215EjeGas.json';
public static jsonIngresos = '../../../assets/data/20201215EjeIng.json';

Anteriormente se usaban ficheros alojados en Digital Ocean.
Ultimo proyecto con comentarios referidos a esto: ocmpre2020eje20201215
