//funcionabilidad del menu sidebar
$(".nav>.nav-item>.nav-link").click(function(){
    $(this).parent().children('.sub-nav').toggle('ease')
    //buscamos en elemento activo anterior
  //  $('.active').parent().children('.sub-nav').toggle('ease')
    $('.active').removeClass('active')
    
    //asignamos el nuevo elemento active
    $(this).addClass('active')
    const flecha = $(this).children('i')[1]
    
    if($(flecha).attr('class') === 'fa fa-angle-left'){
        $(flecha).removeClass('fa-angle-left')
        $(flecha).addClass('fa-angle-down')
    }else if($(flecha).attr('class') === 'fa fa-angle-down'){
        $(flecha).removeClass('fa-angle-down')
        $(flecha).addClass('fa-angle-left')
    }
})

//Router de las vistas

function rutas(ruta) {
    
    if(ruta === '#/articulos' || ruta === '#/categorias' || ruta === '#/ventas' || ruta === '#/cliente' || ruta === '#/usuarios'){

        $.ajax({
            url: 'vistas/'+ruta.slice(2)+'.html',
            success: function(vista){
                $('#seccion').html(vista)
            }
        })
    }else{
        console.log('no se encontro la pagina que busca')
    }
}

window.addEventListener('hashchange', () => {
    let hash = document.location.hash
    rutas(hash)
}, false)

window.addEventListener('load', () => {
    let hash = document.location.hash
    if(hash === ''){
        hash = document.location.hash = '#/articulos'
    }
    rutas(hash)
}, false)