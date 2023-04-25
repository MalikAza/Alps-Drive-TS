import os from 'os'
import path from 'path'

const drivePath: string = path.join(os.tmpdir(), 'drive')

export default drivePath