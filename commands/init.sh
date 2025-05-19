# Añadir un alias para ejecutar /app.sh como batoifolio en el archivo .bashrc
if ! grep -q "alias batoifolio=" ~/.bashrc; then
    echo "Creando el alias batoifolio..."
    batoifolio_path="${PWD}/commands/"
    echo "alias batoifolio='bash ${PWD}/app.sh'" >> ~/.bashrc;
    echo "export batoifolio_path='${batoifolio_path}'" >> ~/.bashrc;


# Auto completar el alias batoifolio
cat << 'EOF' >> ~/.bashrc
_batoifolio_completions() {
    local cur opts
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    opts="-init -run -stop -purge -reload -shell -log -help -newModule"

    if [[ ${cur} == -* ]]; then
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
    fi
    return 0
}

complete -F _batoifolio_completions batoifolio;

EOF

source ~/.bashrc;

fi




# Verificar si Docker está instalado antes de ejecutar
if ! command -v docker-compose &>/dev/null; then
    echo "Error: docker-compose no está instalado."
    exit 1
fi

# Ejecutar docker-compose
echo "Iniciando el contenedor..."

docker compose up --build