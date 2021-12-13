import {Command} from '@oclif/command'
import {createOrmConfig} from "@subsquid/typeorm-config"
import {assertNotNull, OutDir} from "@subsquid/util"
import cli from 'cli-ux'


export default class NewMigration extends Command {
    static description = 'Create template file for a new migration'

    static args = [{name: 'name'}]

    async run(): Promise<void> {
        let {args} = this.parse(NewMigration)
        let name: string = args.name ? args.name : await cli.prompt('Enter migration name', {
            required: true,
        })
        let cfg = createOrmConfig()
        let dir = new OutDir(assertNotNull(cfg.cli?.migrationsDir))
        let timestamp = Date.now()
        let out = dir.file(`${timestamp}-${name}.js`)
        out.block(`module.exports = class ${name}${timestamp}`, () => {
            out.line(`name = '${name}${timestamp}'`)
            out.line()
            out.block(`async up(db)`, () => {
                out.line()
            })
            out.line()
            out.block(`async down(db)`, () => {
                out.line()
            })
        })
        out.write()
    }
}
