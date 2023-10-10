import { DeviceType } from "@/lib/common/entity"
import { Mode } from "@/lib/common/theme"
import { BaseViewModel } from "@/lib/common/view-model"

export interface BaseComponentViewModel extends BaseViewModel {
    device: DeviceType
    mode: Mode
}