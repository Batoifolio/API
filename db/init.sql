-- Crear tablas
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

CREATE TABLE "rol" (
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

CREATE TABLE "Users" (
    "id" integer PRIMARY KEY,
    "nombre" VARCHAR(100),
    "apellidos" VARCHAR(100),
    "username" VARCHAR(100) UNIQUE,
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "foto_perfil" TEXT,
    "descripcion" TEXT,
    "telefono" VARCHAR(20),
    "estado" VARCHAR(20) DEFAULT 'desconectado',
    "ultima_conexion" TIMESTAMP,
    "rol_id" integer,
    "empresa_id" integer,
    "busca_empresa" BOOLEAN DEFAULT false,
    "visibilidad" BOOLEAN DEFAULT true,
    "pueblo" VARCHAR(100),
    "grado_id" integer,
    "rama_id" integer,
    "creado_en" TIMESTAMP DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "refresh_token" (
    "id" integer PRIMARY KEY,
    "Users_id" integer,
    "token" TEXT NOT NULL,
    "ip_access" TEXT,
    "user_agent" TEXT
);

CREATE TABLE "Users_preferencia" (
    "Users_id" integer,
    "preferencia_id" integer,
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "publicacion" (
    "id" integer PRIMARY KEY,
    "Users_id" integer,
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

CREATE TABLE "bloqueos" (
    "id" integer PRIMARY KEY,
    "Users_id" integer,
    "Users_bloqueado_id" integer,
    "fecha_bloqueado" TIMESTAMP DEFAULT (now()),
    "fecha_desbloqueado" TIMESTAMP DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "peticion_segimiento" (
    "id" integer PRIMARY KEY,
    "Users_origen" integer,
    "Users_destino" integer,
    "estado" text,
    "creado_en" timestamp DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "conversacion" (
    "id" integer PRIMARY KEY,
    "Users1_id" integer,
    "Users2_id" integer,
    "creado_en" TIMESTAMP DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE TABLE "mensaje" (
    "id" integer PRIMARY KEY,
    "conversacion_id" integer,
    "remitente_id" integer,
    "contenido" TEXT,
    "estado" VARCHAR(20) DEFAULT 'enviado',
    "creado_en" TIMESTAMP DEFAULT (now()),
    "borrado" BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON "Users_preferencia" ("Users_id", "preferencia_id");

CREATE INDEX "idx_publicacion" ON "imagen_publicacion" ("publicacion_id");

CREATE UNIQUE INDEX ON "bloqueos" ("Users_id", "Users_bloqueado_id");

CREATE UNIQUE INDEX ON "conversacion" ("Users1_id", "Users2_id");

COMMENT ON COLUMN "rama"."id" IS 'Cuando se elimina un grado o Users relacionado con esta rama, se impide la eliminación (Restrict)';

COMMENT ON COLUMN "grado"."id" IS 'Cuando se elimina un Users relacionado con este grado, se impide la eliminación (Restrict)';

COMMENT ON COLUMN "preferencia"."id" IS 'Si se elimina una preferencia que aun esta asignada, se impide la eliminación';

COMMENT ON COLUMN "rol"."id" IS 'Si se elimina un rol que aun esta asignada, se impide la eliminación';

COMMENT ON COLUMN "empresa"."id" IS 'Si se elimina una empresa, se elimina en cascada el Users asociado';

COMMENT ON COLUMN "Users"."estado" IS 'Ej: en línea, ocupado, desconectado';

COMMENT ON COLUMN "Users"."rol_id" IS 'Cuando se elimina un rol, que aun esta asignada, se impide la eliminación';

COMMENT ON COLUMN "Users"."empresa_id" IS 'Puede ser null, Si se elimina una empresa, se elimina en cascada el Users asociado';

COMMENT ON COLUMN "Users"."grado_id" IS 'Cuando se elimina un grado, que aun esta asignada, se impide la eliminación';

COMMENT ON COLUMN "Users"."rama_id" IS 'Cuando se elimina un rama, que aun esta asignada, se impide la eliminación';

COMMENT ON COLUMN "refresh_token"."Users_id" IS 'Si se elimina un Users, se elimina en cascada su token';

COMMENT ON COLUMN "Users_preferencia"."Users_id" IS 'Si se elimina el Users, se elimina en cascada la relación';

COMMENT ON COLUMN "Users_preferencia"."preferencia_id" IS 'Si se elimina la preferencia, se impide la eliminación (Restrict)';

COMMENT ON COLUMN "publicacion"."Users_id" IS 'Si se elimina el Users, se eliminan en cascada las publicaciones asociadas';

COMMENT ON COLUMN "imagen_publicacion"."publicacion_id" IS 'Si se elimina la publicación, se eliminan en cascada las imágenes asociadas';

COMMENT ON COLUMN "peticion_segimiento"."Users_origen" IS 'Si se elimina el Users, se eliminan en cascada las peticion_segimientoes asociadas';

COMMENT ON COLUMN "peticion_segimiento"."Users_destino" IS 'Si se elimina el Users, se eliminan en cascada las peticion_segimientoes asociadas';

COMMENT ON COLUMN "peticion_segimiento"."estado" IS 'Pendiente, Aceptada, Rechazada';

COMMENT ON COLUMN "mensaje"."estado" IS 'Ej: enviado, entregado, leído';

ALTER TABLE
    "refresh_token"
ADD
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "Users_preferencia"
ADD
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "peticion_segimiento"
ADD
    FOREIGN KEY ("Users_origen") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "peticion_segimiento"
ADD
    FOREIGN KEY ("Users_destino") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "publicacion"
ADD
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "Users"
ADD
    FOREIGN KEY ("grado_id") REFERENCES "grado" ("id") ON DELETE RESTRICT;

ALTER TABLE
    "Users"
ADD
    FOREIGN KEY ("rama_id") REFERENCES "rama" ("id") ON DELETE RESTRICT;

ALTER TABLE
    "Users"
ADD
    FOREIGN KEY ("rol_id") REFERENCES "rol" ("id") ON DELETE RESTRICT;

ALTER TABLE
    "Users_preferencia"
ADD
    FOREIGN KEY ("preferencia_id") REFERENCES "preferencia" ("id") ON DELETE RESTRICT;

ALTER TABLE
    "imagen_publicacion"
ADD
    FOREIGN KEY ("publicacion_id") REFERENCES "publicacion" ("id") ON DELETE CASCADE;

ALTER TABLE
    "conversacion"
ADD
    FOREIGN KEY ("Users1_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "conversacion"
ADD
    FOREIGN KEY ("Users2_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "mensaje"
ADD
    FOREIGN KEY ("conversacion_id") REFERENCES "conversacion" ("id") ON DELETE CASCADE;

ALTER TABLE
    "mensaje"
ADD
    FOREIGN KEY ("remitente_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "bloqueos"
ADD
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

ALTER TABLE
    "bloqueos"
ADD
    FOREIGN KEY ("Users_bloqueado_id") REFERENCES "Users" ("id") ON DELETE CASCADE;
-- Inserts 4 rows into all tables
-- Insertar registros en la tabla rama
INSERT INTO
    "rama" ("id", "nombre", "borrado")
VALUES
    (1, 'Informática', false);

INSERT INTO
    "rama" ("id", "nombre", "borrado")
VALUES
    (2, 'Telecomunicaciones', false);

INSERT INTO
    "rama" ("id", "nombre", "borrado")
VALUES
    (3, 'Industrial', false);

INSERT INTO
    "rama" ("id", "nombre", "borrado")
VALUES
    (4, 'Mecánica', false);

-- Insertar registros en la tabla grado
INSERT INTO
    "grado" ("id", "nombre", "borrado")
VALUES
    (1, 'Ingeniería Informática', false);

INSERT INTO
    "grado" ("id", "nombre", "borrado")
VALUES
    (2, 'Ingeniería de Telecomunicaciones', false);

INSERT INTO
    "grado" ("id", "nombre", "borrado")
VALUES
    (3, 'Ingeniería Industrial', false);

INSERT INTO
    "grado" ("id", "nombre", "borrado")
VALUES
    (4, 'Ingeniería Mecánica', false);

-- Insertar registros en la tabla preferencia
INSERT INTO
    "preferencia" ("id", "nombre", "borrado")
VALUES
    (1, 'Desarrollo Web', false);

INSERT INTO
    "preferencia" ("id", "nombre", "borrado")
VALUES
    (2, 'Desarrollo Móvil', false);

INSERT INTO
    "preferencia" ("id", "nombre", "borrado")
VALUES
    (3, 'Desarrollo de Videojuegos', false);

INSERT INTO
    "preferencia" ("id", "nombre", "borrado")
VALUES
    (4, 'Desarrollo de Software', false);

-- Insertar registros en la tabla rol
INSERT INTO
    "rol" ("id", "nombre", "borrado")
VALUES
    (1, 'Administrador', false);

INSERT INTO
    "rol" ("id", "nombre", "borrado")
VALUES
    (2, 'Users', false);

-- Insertar registros en la tabla empresa
INSERT INTO
    "empresa" (
        "id",
        "nombre",
        "cif",
        "direccion",
        "sector",
        "telefono",
        "email",
        "creado_en",
        "borrado"
    )
VALUES
    (
        1,
        'Empresa 1',
        'A12345678',
        'Calle Empresa 1',
        'Tecnología',
        '123456789',
        'empresa1@gmail.com',
        '2021-06-01 00:00:00',
        false
    );

INSERT INTO
    "empresa" (
        "id",
        "nombre",
        "cif",
        "direccion",
        "sector",
        "telefono",
        "email",
        "creado_en",
        "borrado"
    )
VALUES
    (
        2,
        'Empresa 2',
        'B12345678',
        'Calle Empresa 2',
        'Tecnología',
        '123456789',
        'empresa2@gmail.com',
        '2021-06-01 00:00:00',
        false
    );

-- Insertar registros en la tabla Users
INSERT INTO
    "Users" (
        "id",
        "nombre",
        "apellidos",
        "username",
        "email",
        "password",
        "foto_perfil",
        "descripcion",
        "telefono",
        "estado",
        "ultima_conexion",
        "rol_id",
        "empresa_id",
        "busca_empresa",
        "visibilidad",
        "pueblo",
        "grado_id",
        "rama_id",
        "creado_en",
        "borrado"
    )
VALUES
    (
        1,
        'Juan',
        'Pérez',
        'juanp',
        'juanp@gmail.com',
        'password1',
        NULL,
        NULL,
        '123456789',
        'desconectado',
        NULL,
        1,
        1,
        false,
        true,
        'Madrid',
        1,
        1,
        '2021-06-01 00:00:00',
        false
    ),
    (
        2,
        'Ana',
        'García',
        'anag',
        'anag@gmail.com',
        'password2',
        NULL,
        NULL,
        '987654321',
        'desconectado',
        NULL,
        2,
        2,
        false,
        true,
        'Barcelona',
        2,
        2,
        '2021-06-01 00:00:00',
        false
    ),
    (
        3,
        'Luis',
        'Martínez',
        'luism',
        'luism@gmail.com',
        'password3',
        NULL,
        NULL,
        '123123123',
        'desconectado',
        NULL,
        2,
        1,
        false,
        true,
        'Valencia',
        3,
        3,
        '2021-06-01 00:00:00',
        false
    ),
    (
        4,
        'María',
        'López',
        'marial',
        'marial@gmail.com',
        'password4',
        NULL,
        NULL,
        '321321321',
        'desconectado',
        NULL,
        1,
        2,
        false,
        true,
        'Sevilla',
        4,
        4,
        '2021-06-01 00:00:00',
        false
    );

-- Insertar registros en la tabla refresh_token
INSERT INTO
    "refresh_token" (
        "id",
        "Users_id",
        "token",
        "ip_access",
        "user_agent"
    )
VALUES
    (1, 1, 'token1', '192.168.1.1', 'Mozilla/5.0'),
    (2, 2, 'token2', '192.168.1.2', 'Mozilla/5.0'),
    (3, 3, 'token3', '192.168.1.3', 'Mozilla/5.0'),
    (4, 4, 'token4', '192.168.1.4', 'Mozilla/5.0');

-- Insertar registros en la tabla Users_preferencia
INSERT INTO
    "Users_preferencia" ("Users_id", "preferencia_id", "borrado")
VALUES
    (1, 1, false),
    (2, 2, false),
    (3, 3, false),
    (4, 4, false);

-- Insertar registros en la tabla publicacion
INSERT INTO
    "publicacion" (
        "id",
        "Users_id",
        "contenido",
        "creado_en",
        "borrado"
    )
VALUES
    (
        1,
        1,
        'Contenido de la publicación 1',
        '2021-06-01 00:00:00',
        false
    ),
    (
        2,
        2,
        'Contenido de la publicación 2',
        '2021-06-01 00:00:00',
        false
    ),
    (
        3,
        3,
        'Contenido de la publicación 3',
        '2021-06-01 00:00:00',
        false
    ),
    (
        4,
        4,
        'Contenido de la publicación 4',
        '2021-06-01 00:00:00',
        false
    );

-- Insertar registros en la tabla imagen_publicacion
INSERT INTO
    "imagen_publicacion" ("id", "publicacion_id", "url", "borrado")
VALUES
    (1, 1, 'http://imagen1.com', false),
    (2, 2, 'http://imagen2.com', false),
    (3, 3, 'http://imagen3.com', false),
    (4, 4, 'http://imagen4.com', false);

-- Insertar registros en la tabla bloqueos
INSERT INTO
    "bloqueos" (
        "id",
        "Users_id",
        "Users_bloqueado_id",
        "fecha_bloqueado",
        "fecha_desbloqueado",
        "borrado"
    )
VALUES
    (
        1,
        1,
        2,
        '2021-06-01 00:00:00',
        '2021-06-01 00:00:00',
        false
    ),
    (
        2,
        2,
        3,
        '2021-06-01 00:00:00',
        '2021-06-01 00:00:00',
        false
    ),
    (
        3,
        3,
        4,
        '2021-06-01 00:00:00',
        '2021-06-01 00:00:00',
        false
    ),
    (
        4,
        4,
        1,
        '2021-06-01 00:00:00',
        '2021-06-01 00:00:00',
        false
    );

-- Insertar registros en la tabla peticion_segimiento
INSERT INTO
    "peticion_segimiento" (
        "id",
        "Users_origen",
        "Users_destino",
        "estado",
        "creado_en",
        "borrado"
    )
VALUES
    (
        1,
        1,
        2,
        'Pendiente',
        '2021-06-01 00:00:00',
        false
    ),
    (
        2,
        2,
        3,
        'Pendiente',
        '2021-06-01 00:00:00',
        false
    ),
    (
        3,
        3,
        4,
        'Pendiente',
        '2021-06-01 00:00:00',
        false
    ),
    (
        4,
        4,
        1,
        'Pendiente',
        '2021-06-01 00:00:00',
        false
    );

-- Insertar registros en la tabla conversacion
INSERT INTO
    "conversacion" (
        "id",
        "Users1_id",
        "Users2_id",
        "creado_en",
        "borrado"
    )
VALUES
    (1, 1, 2, '2021-06-01 00:00:00', false),
    (2, 2, 3, '2021-06-01 00:00:00', false),
    (3, 3, 4, '2021-06-01 00:00:00', false),
    (4, 4, 1, '2021-06-01 00:00:00', false);

-- Insertar registros en la tabla mensaje
INSERT INTO
    "mensaje" (
        "id",
        "conversacion_id",
        "remitente_id",
        "contenido",
        "estado",
        "creado_en",
        "borrado"
    )
VALUES
    (
        1,
        1,
        1,
        'Mensaje 1',
        'enviado',
        '2021-06-01 00:00:00',
        false
    ),
    (
        2,
        2,
        2,
        'Mensaje 2',
        'enviado',
        '2021-06-01 00:00:00',
        false
    ),
    (
        3,
        3,
        3,
        'Mensaje 3',
        'enviado',
        '2021-06-01 00:00:00',
        false
    ),
    (
        4,
        4,
        4,
        'Mensaje 4',
        'enviado',
        '2021-06-01 00:00:00',
        false
    );