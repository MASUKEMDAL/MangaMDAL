        function mostrarCapitulo(id) {
          var capitulo = document.getElementById(id);
          if (capitulo.style.display === "none" || capitulo.style.display === "") {
            capitulo.style.display = "block";
          } else {
            capitulo.style.display = "none";
          }
        }

        function mostrarCapitulo(capituloId) {
            const capitulo = document.getElementById(capituloId);
            if (capitulo.style.display === 'none' || capitulo.style.display === '') {
                capitulo.style.display = 'block';
            } else {
                capitulo.style.display = 'none';
            }
        }