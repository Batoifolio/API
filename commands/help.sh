clear

# Definir variables de color
COLOR_BLUE="\e[1;34m"
COLOR_RESET="\e[0m"
COLOR_RED="\e[1;31m"

echo "=============================="
echo "       Comando de ayuda"      
echo "=============================="
echo ""
echo "Uso: ./app.sh [opciones] o batoifolio [opciones]"
echo "Opciones:"
echo -e "${COLOR_BLUE}  -init          ${COLOR_RESET}: Inicializa el proyecto"
echo -e "${COLOR_BLUE}  -run           ${COLOR_RESET}: Inicia el proyecto"
echo -e "${COLOR_BLUE}  -stop          ${COLOR_RESET}: Detiene el proyecto"
echo -e "${COLOR_BLUE}  -reload        ${COLOR_RESET}: Reinicia el proyecto"
echo -e "${COLOR_BLUE}  -reload -v     ${COLOR_RESET}: Reinicia el proyecto y los contenedores"
echo -e "${COLOR_BLUE}  -shell         ${COLOR_RESET}: Accede al shell del proyecto"
echo -e "${COLOR_BLUE}  -log           ${COLOR_RESET}: Muestra los logs del proyecto"
echo -e "${COLOR_BLUE}  -help          ${COLOR_RESET}: Muestra la ayuda"
echo -e "${COLOR_RED}  -purge         ${COLOR_RESET}: Limpiar todos los contenedores, imagenes, volumenes y redes"
echo ""
