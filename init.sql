CREATE TABLE "rama" (
    "id" integer PRIMARY KEY,
    "nombre" text,
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "grado" (
    "id" integer PRIMARY KEY,
    "nombre" text,
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "preferencia" (
    "id" integer PRIMARY KEY,
    "nombre" text,
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "empresa" (
    "id" integer PRIMARY KEY,
    "nombre" text,
    "cif" text UNIQUE,
    "direccion" text,
    "sector" text,
    "telefono" VARCHAR(20),
    "email" VARCHAR(255),
    "creado_en" TIMESTAMP DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "usuario" (
    "id" integer PRIMARY KEY,
    "nombre" VARCHAR(100),
    "apellidos" VARCHAR(100),
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "foto_perfil" TEXT,
    "descripcion" TEXT,
    "telefono" VARCHAR(20),
    "rol" text,
    "empresa_id" integer,
    "busca_empresa" BOOLEAN DEFAULT false,
    "visibilidad" BOOLEAN DEFAULT true,
    "pueblo" VARCHAR(100),
    "grado_id" integer,
    "rama_id" integer,
    "creado_en" TIMESTAMP DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "curriculum" (
    "id" integer PRIMARY KEY,
    "usuario_id" integer,
    "pdf" text,
    "generado" boolean,
    "actualizado_en" timestamp DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "usuario_preferencia" (
    "usuario_id" integer,
    "preferencia_id" integer,
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "peticion" (
    "id" integer PRIMARY KEY,
    "usuario_origen" integer,
    "usuario_destino" integer,
    "estado" text,
    "creado_en" timestamp DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "publicacion" (
    "id" integer PRIMARY KEY,
    "usuario_id" integer,
    "contenido" text,
    "creado_en" timestamp DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "imagen_publicacion" (
    "id" integer PRIMARY KEY,
    "publicacion_id" integer,
    "url" text,
    "borrado" BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON "usuario_preferencia" ("usuario_id", "preferencia_id");

CREATE INDEX "idx_publicacion" ON "imagen_publicacion" ("publicacion_id");

COMMENT ON COLUMN "usuario"."rol" IS 'admin, alumno, profesor, empresa';

COMMENT ON COLUMN "usuario"."empresa_id" IS 'Puede ser null';

COMMENT ON COLUMN "peticion"."estado" IS 'Pendiente, Aceptada, Rechazada';

ALTER TABLE
    "usuario"
ADD
    FOREIGN KEY ("empresa_id") REFERENCES "empresa" ("id") ON DELETE CASCADE;

ALTER TABLE
    "curriculum"
ADD
    FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE CASCADE;

ALTER TABLE
    "usuario_preferencia"
ADD
    FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE CASCADE;

ALTER TABLE
    "usuario_preferencia"
ADD
    FOREIGN KEY ("preferencia_id") REFERENCES "preferencia" ("id") ON DELETE RESTRICT;

ALTER TABLE
    "peticion"
ADD
    FOREIGN KEY ("usuario_origen") REFERENCES "usuario" ("id") ON DELETE CASCADE;

ALTER TABLE
    "peticion"
ADD
    FOREIGN KEY ("usuario_destino") REFERENCES "usuario" ("id") ON DELETE CASCADE;

ALTER TABLE
    "publicacion"
ADD
    FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE CASCADE;

ALTER TABLE
    "imagen_publicacion"
ADD
    FOREIGN KEY ("publicacion_id") REFERENCES "publicacion" ("id") ON DELETE CASCADE;

ALTER TABLE
    "usuario"
ADD
    FOREIGN KEY ("grado_id") REFERENCES "grado" ("id") ON DELETE RESTRICT;

ALTER TABLE
    "usuario"
ADD
    FOREIGN KEY ("rama_id") REFERENCES "rama" ("id") ON DELETE RESTRICT;

-- Insertar registros en la tabla "rama"
INSERT INTO
    "rama" ("id", "nombre")
VALUES
    (1, 'Informatica'),
    (2, 'Artes'),
    (3, 'Tecnología'),
    (4, 'Humanidades');

-- Insertar registros en la tabla "grado"
INSERT INTO
    "grado" ("id", "nombre")
VALUES
    (1, 'Exprecialización'),
    (2, 'Superior'),
    (3, 'Medio'),
    (4, 'Basica');

-- Insertar registros en la tabla "preferencia"
INSERT INTO
    "preferencia" ("id", "nombre")
VALUES
    (1, 'Trabajo Remoto'),
    (2, 'Jornada Completa'),
    (3, 'Medio Tiempo'),
    (4, 'Prácticas');

-- Insertar registros en la tabla "empresa"
INSERT INTO
    "empresa" (
        "id",
        "nombre",
        "cif",
        "direccion",
        "sector",
        "telefono",
        "email"
    )
VALUES
    (
        1,
        'Tech Solutions',
        'B12345678',
        'Calle Falsa 123',
        'Tecnología',
        '123456789',
        'contacto@techsolutions.com'
    ),
    (
        2,
        'Artistic Creations',
        'B87654321',
        'Avenida Siempre Viva 742',
        'Artes',
        '987654321',
        'info@artisticcreations.com'
    ),
    (
        3,
        'Historical Research',
        'B11223344',
        'Plaza Mayor 1',
        'Investigación',
        '1122334455',
        'contact@historicalresearch.com'
    ),
    (
        4,
        'Science Innovations',
        'B44332211',
        'Calle de la Ciencia 45',
        'Ciencias',
        '5566778899',
        'info@scienceinnovations.com'
    );

-- Insertar registros en la tabla "usuario"
INSERT INTO
    "usuario" (
        "id",
        "nombre",
        "apellidos",
        "email",
        "password",
        "telefono",
        "rol",
        "empresa_id",
        "busca_empresa",
        "visibilidad",
        "pueblo",
        "grado_id",
        "rama_id"
    )
VALUES
    (
        1,
        'Juan',
        'Pérez',
        'juan.perez@example.com',
        'password123',
        '123456789',
        'alumno',
        1,
        true,
        true,
        'Madrid',
        3,
        3
    ),
    (
        2,
        'Ana',
        'García',
        'ana.garcia@example.com',
        'password123',
        '987654321',
        'profesor',
        NULL,
        false,
        true,
        'Barcelona',
        2,
        2
    ),
    (
        3,
        'Luis',
        'Martínez',
        'luis.martinez@example.com',
        'password123',
        '1122334455',
        'empresa',
        2,
        false,
        true,
        'Valencia',
        1,
        1
    ),
    (
        4,
        'María',
        'López',
        'maria.lopez@example.com',
        'password123',
        '5566778899',
        'admin',
        NULL,
        false,
        true,
        'Sevilla',
        4,
        4
    );

-- Insertar registros en la tabla "curriculum"
INSERT INTO
    "curriculum" ("id", "usuario_id", "pdf", "generado")
VALUES
    (1, 1, 'curriculum_juan.pdf', true),
    (2, 2, 'curriculum_ana.pdf', true),
    (3, 3, 'curriculum_luis.pdf', false),
    (4, 4, 'curriculum_maria.pdf', true);

-- Insertar registros en la tabla "usuario_preferencia"
INSERT INTO
    "usuario_preferencia" ("usuario_id", "preferencia_id")
VALUES
    (1, 1),
    (1, 4),
    (1, 2),
    (2, 3),
    (3, 4);

-- Insertar registros en la tabla "peticion"
INSERT INTO
    "peticion" (
        "id",
        "usuario_origen",
        "usuario_destino",
        "estado"
    )
VALUES
    (1, 1, 2, 'Pendiente'),
    (2, 2, 3, 'Aceptada'),
    (3, 3, 4, 'Rechazada'),
    (4, 4, 1, 'Pendiente'),
    (5, 1, 2, 'Aceptada');

-- Insertar registros en la tabla "publicacion"
INSERT INTO
    "publicacion" ("id", "usuario_id", "contenido")
VALUES
    (1, 1, 'Primera publicación de Juan'),
    (2, 2, 'Primera publicación de Ana'),
    (3, 3, 'Primera publicación de Luis'),
    (4, 4, 'Primera publicación de María'),
    (5, 1, 'Luis es un mameluco');

-- Insertar registros en la tabla "imagen_publicacion"
INSERT INTO
    "imagen_publicacion" ("id", "publicacion_id", "url")
VALUES
    (1, 1, 'http://example.com/imagen1.jpg'),
    (2, 2, 'http://example.com/imagen2.jpg'),
    (3, 3, 'http://example.com/imagen3.jpg'),
    (4, 4, 'http://example.com/imagen4.jpg');