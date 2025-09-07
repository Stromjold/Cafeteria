import random

def generar_seis_digitos():
    """
    Genera una serie de 14 dígitos aleatorios.

    Returns:
        str: Una cadena de 14 dígitos.
    """
    # Genera un número aleatorio entre 100,000 y 999,999
    digitos = random.randint(10000000000000, 99999999999999)
    return str(digitos)

# Ejemplo de uso
serie_de_digitos = generar_seis_digitos()
print(f"La serie de 14 dígitos aleatorios es: {serie_de_digitos}")

# Puedes llamarla varias veces para obtener diferentes series
print(f"Codigo 1: {generar_seis_digitos()}")
print(f"Y otro Codigo: {generar_seis_digitos()}")