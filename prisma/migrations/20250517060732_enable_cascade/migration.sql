-- DropForeignKey
ALTER TABLE "Transaccion" DROP CONSTRAINT "Transaccion_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
