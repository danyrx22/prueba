

function datosSelectCategorias(){
    $.ajax({
        url: 'api-categorias/lista-categorias',
        method: 'GET',
        dataType: 'json',

        success: function(categorias){
            let i
            let opcionCategoria = '<option value="0"> Categoria </option>'
            for(i = 0; i < categorias.length; i++){
                opcionCategoria += '<option value="'+categorias[i].id+'"> '+categorias[i].nombre+' </option>'
            }
           
            $('#select_categoria_art').html(opcionCategoria)
        }
    })
}

function date_art(){
    $.ajax({
        url: 'api-articulos',
        method: 'GET',
        dataType: 'json',

        success: function(articulos){
            listar_art(articulos)
        }
    })
}

function listar_art(articulos){

    let i
    $('#list_art').children('tbody').html('')
    if(articulos.length > 0){
        let filaArticulo
        for(i = 0; i < articulos.length; i++){
            let botones
            let condicion
            if(articulos[i].condicion === 0){
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrar_arts('+articulos[i].id+')">Editar</button> <button type="button" class="btn btn-danger btn-sm" onclick="deshabilitar_art('+articulos[i].id+')">Deshabilitar</button></td></tr>'
                condicion = 'A'
            }else{
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrar_arts('+articulos[i].id+')">Editar</button> <button type="button" class="btn btn-success btn-sm" onclick="habilitar_art('+articulos[i].id+')">Habilitar</button></td></tr>'
                condicion = 'I'
            }

            filaArticulo += '<tr><td>'+articulos[i].id+'</td><td>'+articulos[i].Categoria.nombre+'</td><td>'+articulos[i].nombre+'</td><td>'+articulos[i].codigo+'</td><td>'+articulos[i].stock+'</td><td>'+condicion+'</td><td>'+botones+'</td>'
        }

        $('#list_art').children('tbody').html(filaArticulo)
    }else{
        $('#list_art').children('tbody').html('<tr><td colspan="7" class="text-center">No se encontron ningun producto.</td></tr>')
    }
}

function add_art(){
    $('#contenedor_formulario').slideDown('30') 
    $('#contenedor_formulario .title').text('Registrar Articulo')
    $('#boton_registrar_art').val('Registrar Articulo')
    vaciar_formulario_art()
}

function cancelarRegistroArticulo(){
    $('#contenedor_formulario').hide('ease')
    vaciar_formulario_art()
}

function vaciar_formulario_art(){
    $('#id_art').val("")
    $('#select_categoria_art').val(0)
    $('#nombre_art').val('')
    $('#cod_art').val('')
    $('#precio_venta_art').val('')
    $('#stock_art').val('')
    $('#descrip_art').val('')
}

function regis_art(){
    const catego = $('#select_categoria_art').val()
    const nom = $('#nombre_art').val()
    const cod = $('#cod_art').val()
    const precio_venta = $('#precio_venta_art').val()
    const stock = $('#stock_art').val()
    const descrip = $('#descrip_art').val()

    if(catego !== '0' && nom !== '' && cod !== '' &&  precio_venta !== '' &&  stock !== '' &&  descrip !== ''){
        const datos = {
            categoria: catego,
            nombre: nom,
            codigo: cod,
            precio_venta: precio_venta,
            stock: stock,
            descripcion: descrip
        }
    
        $.ajax({
            url: 'api-articulos/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i>  Registro exitoso </label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contenedor_formulario').hide()
                    vaciar_formulario_art()
                    date_art()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Error al registrar </label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío(s) </span>')
    }
}

function mostrar_arts(id){
    $.ajax({
        url: 'api-articulos/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){

            if(respuesta){
                $('#contenedor_formulario').hide('ease')
                $('#id_art').val(respuesta.id)
                $('#select_categoria_art').val(respuesta.idcategoria)
                $('#nombre_art').val(respuesta.nombre)
                $('#cod_art').val(respuesta.codigo)
                $('#precio_venta_art').val(respuesta.precio_venta)
                $('#stock_art').val(respuesta.stock)
                $('#descrip_art').val(respuesta.descripcion)

                $('#contenedor_formulario .title').text('Actualizar Articulo')
                $('#boton_registrar_art').val('Actualizar Articulo')
                $('#contenedor_formulario').first().slideDown('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se encontraron datos del articulo !!</label>')
            }
        }
    })
}

function edit_art(){
    const id = $('#id_art').val()
    const catego = $('#select_categoria_art').val()
    const nomb = $('#nombre_art').val()
    const cod = $('#cod_art').val()
    const precio_venta = $('#precio_venta_art').val()
    const stock = $('#stock_art').val()
    const descrip = $('#descrip_art').val()

    if(id !== '' &&  catego !== '0' &&  nom !== '' &&  cod !== '' &&  precio_venta !== '' &&  stock !== '' &&  descrip !== ''){
        const datos = {
            id: id,
            categoria: catego,
            nombre: nomb,
            codigo: cod,
            precio_venta: precio_venta,
            stock: stock,
            descripcion: descrip
        }

        $.ajax({
            url: 'api-articulos/actualizar/'+id,
            method: 'PATCH',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Articulo Actualizado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contenedor_formulario').hide()
                    vaciar_formulario_art()
                    date_art()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Articulo no se pudo actualizar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function deshabilitar_art(id){
    $.ajax({
        url: 'api-articulos/desactivar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                date_art()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Articulo no se pudo deshabilitar </label>')
            }
        }
    })
}

function habilitar_art(id){
    $.ajax({
        url: 'api-articulos/activar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                date_art()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Articulo no se pudo activar !!</label>')
            }
        }
    })
}

function buscar_art(){
    const art = $('#buscar_articulos').val()
    if(art !== ''){
        $.ajax({
            url: 'api-articulos/buscar/'+art,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(articulos){
                $('.alerta-buscador').html('')
                listar_art(articulos)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Debe ingresar un dato para buscar')
    }
}