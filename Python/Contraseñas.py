import random

def generar_seis_digitos():
    """
    Genera una serie de 6 dígitos aleatorios.

    Returns:
        str: Una cadena de 6 dígitos.
    """
    # Genera un número aleatorio entre 100,000 y 999,999
    digitos = random.randint(100000, 999999)
    return str(digitos)

# Ejemplo de uso
serie_de_digitos = generar_seis_digitos()
print(f"La serie de 6 dígitos aleatorios es: {serie_de_digitos}")

# Puedes llamarla varias veces para obtener diferentes series
print(f"Otra serie: {generar_seis_digitos()}")
print(f"Y otra más: {generar_seis_digitos()}")