<?php
include(__DIR__ . "/../db.php");


// Datos del usuario de prueba
$correo = "test@ejemplo.com";
$contrasena = password_hash("123456", PASSWORD_DEFAULT); // Encriptación segura
$estado = 1;
$rol = "admin";

$sql = "INSERT INTO usuarios (correo, contrasena, estado, rol) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssis", $correo, $contrasena, $estado, $rol);

if ($stmt->execute()) {
    echo "✅ Usuario de prueba creado exitosamente.";
} else {
    echo "❌ Error al crear el usuario: " . $stmt->error;
}

$conn->close();
