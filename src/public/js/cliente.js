

function datos_clientes(){
  
    $.ajax({
        url: 'api-clientes',
        method: 'GET',
        dataType: 'json',

        success: function(clientes){
           
            listar_cliente(clientes)
        }
    })
}

function listar_cliente(cliente){

    let i
    $('#listar_cliente').children('tbody').html('')
    if(cliente.length > 0){
        let fila_cliente
        for(i = 0; i < cliente.length; i++){
            let botones
            
            if(cliente[i].condicion === 0){
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosArticulo('+cliente[i].id+')">Editar</button> <button type="button" class="btn btn-danger btn-sm" onclick="desactivarProveedor('+cliente[i].id+')">Eliminar</button></td></tr>'
               
            }else{
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosArticulo('+cliente[i].id+')">Editar</button> <button type="button" class="btn btn-success btn-sm" onclick="activarProveedor('+cliente[i].id+')">Restaurar</button></td></tr>'
               
            }

            fila_cliente += '<tr><td>'+cliente[i].id+'</td><td>'+cliente[i].nombre+'</td><td>'+cliente[i].telefono+'</td><td>'+cliente[i].email+'</td><td>'+botones+'</td>'
        }

        $('#listar_cliente').children('tbody').html(fila_cliente)
    }else{
        $('#listar_cliente').children('tbody').html('<tr><td colspan="7" class="text-center">No se encontron ningun cliente.</td></tr>')
    }
}

function agregar_cliente(){
    $('#contenedor_registro_cliente').show('ease') 
    $('#contenedor_registro_cliente .title').text('Registrar Cliente')
    $('#boton_registrar_cliente').val('Registrar Cliente')
    limpiar_formulario_cliente()
}

function cancelar_registro_cliente(){
    $('#contenedor_registro_cliente').hide('ease')
    limpiar_formulario_cliente()
}

function limpiar_formulario_cliente(){
    $('#id_cliente').val('')
    $('#dni_cliente').val('')
    $('#nombre_cliente').val('')
    $('#telefono_cliente').val('')
    $('#email_cliente').val('')
    $('#direccion_cliente').val('')
}

function registrar_cliente(){
    const dni_cliente = $('#dni_cliente').val()
    const nombre = $('#nombre_cliente').val()
    const telefono = $('#telefono_cliente').val()
    const email = $('#email_cliente').val()
    const direccion = $('#direccion_cliente').val()

    if(dni_cliente !== ''  && nombre !== '' &&  telefono !== '' &&  email !== '' &&  direccion !== ''){
        const datos = {
            num_documento: dni_cliente,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion
        }
    
        $.ajax({
            url: 'api-clientes/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> El cliente ha siado registrado</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#contenedor_registro_cliente').hide()
                    limpiar_formulario_cliente()
                    datos_clientes()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Cliente no se pudo registrar </label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function mostrarDatosArticulo(id){
    $.ajax({
        url: 'api-clientes/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta){
                $('#contenedor_registro_cliente').hide('ease')
                $('#id_cliente').val(respuesta.id)
                $('#dni_cliente').val(respuesta.num_documento)
                $('#nombre_cliente').val(respuesta.nombre)
                $('#telefono_cliente').val(respuesta.telefono)
                $('#email_cliente').val(respuesta.email)
                $('#direccion_cliente').val(respuesta.direccion)

                $('#contenedor_registro_cliente .title').text('Actualizar cliente')
                $('#boton_registrar_cliente').val('Actualizar cliente')
                $('#contenedor_registro_cliente').show('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se encontraron datos del cliente </label>')
            }
        }
    })
}

function editar_cliente(){
    const id = $('#id_cliente').val()
    const dni_usario = $('#dni_cliente').val()
    const nombre = $('#nombre_cliente').val()
    const telefono = $('#telefono_cliente').val()
    const email = $('#email_cliente').val()
    const direccion = $('#direccion_cliente').val()
    

    if(dni_usario !== '' &&  nombre !== ''&&  telefono !== ''&&  email !== ''&&  direccion !== '' ){
        const datos = {
            id: id,
            num_documento:dni_usario,
            nombre: nombre,
           
            telefono: telefono,
            email: email,
            direccion: direccion,
          
        }

        $.ajax({
            url: 'api-clientes/actualizar/'+id,
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
                    $('#contenedor_registro_cliente').hide()
                    limpiar_formulario_cliente()
                    datos_clientes()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Actualización fallida</label>')
                }
            }
        })
    }else{
        
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío(s) </span>')
    }
}




function desactivarProveedor(id){
    $.ajax({
        url: 'api-clientes/desactivar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                datos_clientes()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Proveedor no se pudo desactivar !!</label>')
            }
        }
    })
}

function activarProveedor(id){
    $.ajax({
        url: 'api-clientes/activar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                datos_clientes()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Proveedor no se pudo activar !!</label>')
            }
        }
    })
}

function buscar_cliente(){
    const cliente = $('#buscar_cliente').val()
    if(cliente !== ''){
        $.ajax({
            url: 'api-clientes/buscar/'+cliente,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(clientes){
                $('.alerta-buscador').html('')
                listar_cliente(clientes)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Ingrese un dato para buscar !!')
    }
}