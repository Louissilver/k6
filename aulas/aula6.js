// Módulos

// é possível utilizar módulos nativos do K6, bem como módulos externos otimizados (jslib.k6.io), além de módulos locais, criados pelo próprio desenvolvedor

// default
import http from "k6/http";
// externos
import { AWSConfig, S3Client } from "https://jslib.k6.io/aws/0.4.0/s3.js";
// local
import { options } from "./aula1.js";
