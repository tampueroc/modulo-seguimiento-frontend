import { Seguimiento, SeguimientoUpdate } from "@/types/Seguimiento";
import { SeguimientoForm } from "../CaseForm";
import { EntryCreate } from "@/types/UtilitySchemas";
import * as fns from "date-fns";
import _ from "lodash";

export function serializeSeguimientoUpdate(
  formData: SeguimientoForm,
  seguimiento: Seguimiento,
  newEntries: EntryCreate[]
): SeguimientoUpdate {
  const seguimientoUpdate: SeguimientoUpdate = {
    ...seguimiento,
    ...formData,
    ultimo_contacto: formData.ultimo_contacto
      ? fns.format(formData.ultimo_contacto as Date, "yyyy-MM-dd")
      : seguimiento.ultimo_contacto,
    fecha_defuncion: formData.fecha_defuncion
      ? fns.format(formData.fecha_defuncion as Date, "yyyy-MM-dd")
      : null,
    // todo: sigue_atencion_otro_centro podría estar faltando en el backend
    //fecha_estimada: formData.fecha_estimada,  //OJO NO ESTA EN EL MODELO DE DATOS
    new_entries: newEntries,
    updated_entries: [],
    deleted_entries: [],
  };
  return seguimientoUpdate;
}

export function unserializeSeguimiento(
  seguimiento: Seguimiento
): SeguimientoForm {
  return {
    ...seguimiento,
    ultimo_contacto: unserializeIsoDate(seguimiento.ultimo_contacto),
    fecha_defuncion: unserializeIsoDate(seguimiento.fecha_defuncion),
  };
}

function unserializeIsoDate(iso_date: string | null | undefined) {
  return _.isNil(iso_date) ? null : new Date(iso_date);
}
