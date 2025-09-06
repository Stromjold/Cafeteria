import random
import re

def generar_datos_compania(nombre_compania):
    """
    Genera un RUT, correo y teléfono simulados para una compañía.
    
    Args:
        nombre_compania (str): El nombre de la compañía.
        
    Returns:
        dict: Un diccionario con el RUT, correo y teléfono generados.
    """
    # 1. Generar un RUT ficticio (en formato chileno)
    # Genera un número de 7 u 8 dígitos
    numero_rut = random.randint(1000000, 99999999)
    # Calcula el dígito verificador
    s = str(numero_rut)
    reversed_digits = map(int, reversed(s))
    factors = [2, 3, 4, 5, 6, 7]
    sum_ = sum(d * factors[i % 6] for i, d in enumerate(reversed_digits))
    dv = 11 - (sum_ % 11)
    dv = 'K' if dv == 10 else str(0) if dv == 11 else str(dv)
    
    # Formatea el RUT con puntos y guion
    rut_formateado = f"{numero_rut: ,.0f}".replace(",", ".").replace(" ", "") + f"-{dv}"
    
    # 2. Generar un correo electrónico plausible
    # Limpia el nombre de la compañía para usarlo en el correo
    nombre_limpio = re.sub(r'[^a-zA-Z0-9]', '', nombre_compania).lower()
    if not nombre_limpio:
        nombre_limpio = "empresa"
    correo = f"contacto@{nombre_limpio}.cl"
    
    # 3. Generar un número de teléfono ficticio (en formato chileno)
    # El formato general es +56 9 XXXX XXXX
    telefono = f"+56 9 {random.randint(1000, 9999):04d} {random.randint(1000, 9999):04d}"
    
    return {
        "rut": rut_formateado,
        "correo": correo,
        "telefono": telefono
    }

# Solicitar el nombre de la compañía al usuario
nombre = input("Ingrese el nombre de la compañía: ")

datos_generados = generar_datos_compania(nombre)

print(f"Datos generados para la compañía: {nombre}")
print(f"RUT: {datos_generados['rut']}")
print(f"Correo: {datos_generados['correo']}")
print(f"Teléfono: {datos_generados['telefono']}")