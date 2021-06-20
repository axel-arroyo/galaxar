# Changelog

## [17-06-2021] Base de datos it_1 
### Added
- Base de datos de usuarios, reportes y grupos.
- Rutas con métodos POST/GET para testing.

## [19-06-2021] Register + Login
### Added
- Rutas para registro y login, con jwt.
### Changes
- Cambio de campo "mail" de modelo User a "email".

## [20-06-2021] Login Registro Grupos (beta)
### Added
- Login y registro Frontend (beta).
- Creación de grupos (beta).

## [20-06-2021] Roles y Capacitaciones
### Added
- Modelos: Roles y Máquinas, además de los modelos de intersección para las relaciones M:N.
- Rutas para roles y capacitaciones, se incluye una ruta para crear máquinas que se usan en las capacitaciones.
### Changes
- Cambio de campo "description" de modelo Group a "name".
- Agregado config de sequelize a .gitignore.