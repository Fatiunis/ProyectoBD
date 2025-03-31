# Sistema Integrado ADFS

Este repositorio contiene los tres sistemas integrados del proyecto ADFS:
- 🏥 Hospital
- 💊 Farmacia
- 🛡️ Seguro

## Estructura

```
sistema_adfs/               → Backend (PHP + MySQL + APIs REST)
HOSPITAL_SYSTEM_REACT/     → Frontend Hospital (React + Bootstrap)
FARMACIA_SYSTEM_REACT/     → Frontend Farmacia (React + Bootstrap)
SEGURO_SYSTEM_REACT/       → Frontend Seguro (React + Bootstrap)
```

## Cómo correr el proyecto

### Backend (XAMPP)
1. Coloca `sistema_adfs` dentro de `htdocs`.
2. Asegúrate de que `db.php` tenga la conexión correcta a MySQL.

### Frontend
```bash
cd FARMACIA_SYSTEM_REACT
npm install
npm run dev
```

(igual para los otros frontends)

## Documentación
- Ver carpeta `/docs` para ver requerimientos, manuales y charters.
