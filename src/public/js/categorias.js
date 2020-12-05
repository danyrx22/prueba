

function datos_cat(){

    $.ajax({
        url: 'api-categorias',
        method: 'GET',
        dataType: 'json',

        success: function(respuesta){
            list_cat(respuesta)
        }
    })
}

function list_cat(categorias){
    let i 
    $('#list_cat').children('tbody').html('')
    if(categorias.length > 0){
        let filaCategoria
        for(i = 0; i < categorias.length; i++){
            let botones
            if(categorias[i].condicion === 0){
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosCategoria('+categorias[i].id+')">Editar</button> <button type="button" class="btn btn-danger btn-sm" onclick="deshabilitar_categoira('+categorias[i].id+')">Eliminar</button>'
            }else{
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosCategoria('+categorias[i].id+')">Editar</button> <button type="button" class="btn btn-success btn-sm" onclick="habilitar_categoria('+categorias[i].id+')">Restaurar</button>'
            }

            filaCategoria += '<tr><td>'+categorias[i].id+'</td><td>'+categorias[i].nombre+'</td><td>'+categorias[i].descripcion+'</td><td>'+botones+'</td><tr>'
        }

        $('#list_cat').children('tbody').html(filaCategoria)
    }else{
        $('#list_cat').children('tbody').html('<tr><td colspan="4" class="text-center">No se encontro ninguna categorias</td></tr>')
    }
}

function add_categoria(){
    $('#contenedor_formulario').show('ease') 
    $('#contenedor_formulario .title').text('Registrar Categoria')
    $('#btnRegistrarCategoria').val('Registrar Categoria')
    limpiar_formulario_categoria()
}

function cancelar_regis_categoria(){
    $('#contenedor_formulario').hide('ease')
    limpiar_formulario_categoria()
}

function limpiar_formulario_categoria(){
    $('#nombre_cat').val('')
    $('#descripcion_cat').val('')
}

function regis_categoria(){
    const nombre = $('#nombre_cat').val()
    const descripcion = $('#descripcion_cat').val()

    if(nombre !== '' && descripcion !== ''){
        const datos = {
            nombre: nombre,
            descripcion: descripcion
        }
    
        $.ajax({
            url: 'api-categorias/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
               
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i>  Registrado exitoso</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contenedor_formulario').hide()
                    limpiar_formulario_categoria()
                    datos_cat()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se pudo registrar la categoria</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío(s) </span>')
    }
}

function mostrarDatosCategoria(id){
    $.ajax({
        url: 'api-categorias/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){

            if(respuesta){
                $('#contenedor_formulario').hide('ease')
                $('#idCategoria').val(respuesta.id)
                $('#nombre_cat').val(respuesta.nombre)
                $('#descripcion_cat').val(respuesta.descripcion)

                $('#contenedor_formulario .title').text('Actualizar Categoria')
                $('#btnRegistrarCategoria').val('Actualizar Categoria')
                $('#contenedor_formulario').show('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i>  datos no encontrados de la categoria </label>')
            }
            
        }
    })
}

function edit_categoria(){
    const id = $('#idCategoria').val()
    const nombre = $('#nombre_cat').val()
    const descripcion = $('#descripcion_cat').val()

    if(id !== '' && nombre !== '' && descripcion !== ''){
        const datos = {
            id: id,
            nombre: nombre,
            descripcion: descripcion
        }

        $.ajax({
            url: 'api-categorias/actualizar/'+id,
            method: 'PATCH',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i>  Actualización exitosa</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contenedor_formulario').hide()
                    limpiar_formulario_categoria()
                    datos_cat()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Actualización fallida</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío(s) </span>')
    }
}

function deshabilitar_categoira(id){
    $.ajax({
        url: 'api-categorias/desactivar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                datos_cat()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Categoria no se pudo deshabilitar </label>')
            }
        }
    })
}

function habilitar_categoria(id){
    $.ajax({
        url: 'api-categorias/activar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                datos_cat()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Categoria no se pudo activar !!</label>')
            }
        }
    })
}

function buscar_cat(){
    const categoria = $('#buscar_cat').val()
    if(categoria !== ''){
        $.ajax({
            url: 'api-categorias/buscar/'+categoria,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(categorias){
                $('.alerta-buscador').html('')
                list_cat(categorias)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Debe ingresar un dato ha buscar')
    }
}