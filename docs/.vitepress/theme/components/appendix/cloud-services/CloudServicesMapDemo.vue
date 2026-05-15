<template>
  <div class="cloud-services-map-demo">
    <div class="demo-header">
      <h4>Bản đồ tổng quan dịch vụ Cloud Computing</h4>
      <p class="demo-desc">
        Click vào từng nhóm để xem dịch vụ tương ứng của AWS và Alibaba Cloud
      </p>
    </div>

    <div class="map-container">
      <!-- Compute layer -->
      <div
        class="service-layer compute-layer"
        :class="{ active: activeLayer === 'compute' }"
        @click="setActiveLayer('compute')"
      >
        <div class="layer-icon">
          ⚙️
        </div>
        <div class="layer-title">
          Compute Services
        </div>
        <div class="layer-services">
          <span class="service-tag">EC2/ECS</span>
          <span class="service-tag">Lambda/Function Compute</span>
        </div>
      </div>

      <!-- Storage layer -->
      <div
        class="service-layer storage-layer"
        :class="{ active: activeLayer === 'storage' }"
        @click="setActiveLayer('storage')"
      >
        <div class="layer-icon">
          💾
        </div>
        <div class="layer-title">
          Storage Services
        </div>
        <div class="layer-services">
          <span class="service-tag">S3/OSS</span>
          <span class="service-tag">EBS/Cloud Disk</span>
        </div>
      </div>

      <!-- Network layer -->
      <div
        class="service-layer network-layer"
        :class="{ active: activeLayer === 'network' }"
        @click="setActiveLayer('network')"
      >
        <div class="layer-icon">
          🌐
        </div>
        <div class="layer-title">
          Network Services
        </div>
        <div class="layer-services">
          <span class="service-tag">VPC</span>
          <span class="service-tag">ELB/SLB</span>
        </div>
      </div>

      <!-- Security layer -->
      <div
        class="service-layer security-layer"
        :class="{ active: activeLayer === 'security' }"
        @click="setActiveLayer('security')"
      >
        <div class="layer-icon">
          🔒
        </div>
        <div class="layer-title">
          Dịch vụ bảo mật
        </div>
        <div class="layer-services">
          <span class="service-tag">IAM/RAM</span>
          <span class="service-tag">KMS/Key Management</span>
        </div>
      </div>

      <!-- Database layer -->
      <div
        class="service-layer database-layer"
        :class="{ active: activeLayer === 'database' }"
        @click="setActiveLayer('database')"
      >
        <div class="layer-icon">
          🗄️
        </div>
        <div class="layer-title">
          Dịch vụ Database
        </div>
        <div class="layer-services">
          <span class="service-tag">RDS/PolarDB</span>
          <span class="service-tag">DynamoDB/Tablestore</span>
        </div>
      </div>

      <!-- Middleware layer -->
      <div
        class="service-layer middleware-layer"
        :class="{ active: activeLayer === 'middleware' }"
        @click="setActiveLayer('middleware')"
      >
        <div class="layer-icon">
          🔧
        </div>
        <div class="layer-title">
          Dịch vụ Middleware
        </div>
        <div class="layer-services">
          <span class="service-tag">MQ/RocketMQ</span>
          <span class="service-tag">ElastiCache/Redis</span>
        </div>
      </div>
    </div>

    <!-- Detail panel -->
    <div
      v-if="activeLayer"
      class="detail-panel"
    >
      <div class="detail-header">
        <h5>{{ layerDetails[activeLayer].title }}</h5>
        <button
          class="close-btn"
          @click="activeLayer = null"
        >
          ×
        </button>
      </div>
      <div class="detail-content">
        <div class="comparison-table">
          <div class="table-header">
            <div class="col aws">
              AWS
            </div>
            <div class="col aliyun">
              Alibaba Cloud
            </div>
            <div class="col desc">
              Mô tả chức năng
            </div>
          </div>
          <div
            v-for="(item, index) in layerDetails[activeLayer].services"
            :key="index"
            class="table-row"
          >
            <div class="col aws">
              {{ item.aws }}
            </div>
            <div class="col aliyun">
              {{ item.aliyun }}
            </div>
            <div class="col desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref(null)

const setActiveLayer = (layer) => {
  activeLayer.value = layer
}

const layerDetails = {
  compute: {
    title: 'So sánh dịch vụ Compute',
    services: [
      {
        aws: 'Amazon EC2',
        aliyun: 'ECS Cloud Server',
        desc: 'Virtual server, kiểm soát hoàn toàn tài nguyên compute'
      },
      {
        aws: 'AWS Lambda',
        aliyun: 'Function Compute FC',
        desc: 'Serverless compute, chạy code theo yêu cầu'
      },
      {
        aws: 'Amazon ECS/EKS',
        aliyun: 'ACK Container Service',
        desc: 'Dịch vụ orchestration và quản lý container'
      },
      {
        aws: 'AWS Fargate',
        aliyun: 'Serverless Kubernetes',
        desc: 'Serverless container compute engine'
      },
      {
        aws: 'AWS Batch',
        aliyun: 'Batch Compute',
        desc: 'Dịch vụ scheduling batch job'
      },
      {
        aws: 'AWS Elastic Beanstalk',
        aliyun: 'EDAS',
        desc: 'Nền tảng deployment và hosting ứng dụng'
      }
    ]
  },
  storage: {
    title: 'So sánh dịch vụ Storage',
    services: [
      {
        aws: 'Amazon S3',
        aliyun: 'OSS Object Storage',
        desc: 'Object storage dung lượng lớn, bảo mật, chi phí thấp'
      },
      {
        aws: 'Amazon EBS',
        aliyun: 'Cloud Disk ESSD',
        desc: 'Block storage, cung cấp lưu trữ bền vững cho EC2/ECS'
      },
      {
        aws: 'Amazon EFS',
        aliyun: 'NAS File Storage',
        desc: 'Elastic file storage được quản lý'
      },
      {
        aws: 'Amazon Glacier',
        aliyun: 'OSS Archive Storage',
        desc: 'Archive storage chi phí thấp cho lưu trữ dài hạn'
      },
      {
        aws: 'AWS Storage Gateway',
        aliyun: 'Hybrid Cloud Storage Array',
        desc: 'Dịch vụ hybrid cloud storage'
      },
      {
        aws: 'AWS Backup',
        aliyun: 'Cloud Backup Service',
        desc: 'Quản lý backup tập trung'
      }
    ]
  },
  network: {
    title: 'So sánh dịch vụ Network',
    services: [
      {
        aws: 'Amazon VPC',
        aliyun: 'VPC',
        desc: 'Môi trường mạng virtual private cloud'
      },
      {
        aws: 'Elastic Load Balancing',
        aliyun: 'SLB Load Balancer',
        desc: 'Dịch vụ phân phối lưu lượng'
      },
      {
        aws: 'Amazon CloudFront',
        aliyun: 'CDN',
        desc: 'CDN toàn cầu'
      },
      {
        aws: 'AWS Transit Gateway',
        aliyun: 'Cloud Enterprise Network CEN',
        desc: 'Network transit gateway'
      },
      {
        aws: 'AWS Direct Connect',
        aliyun: 'Express Connect',
        desc: 'Dịch vụ kết nối đường truyền riêng'
      },
      {
        aws: 'AWS App Mesh',
        aliyun: 'Service Mesh ASM',
        desc: 'Quản lý microservices mesh'
      },
      {
        aws: 'AWS Global Accelerator',
        aliyun: 'Global Accelerator GA',
        desc: 'Dịch vụ tăng tốc network'
      }
    ]
  },
  security: {
    title: 'So sánh dịch vụ bảo mật',
    services: [
      {
        aws: 'AWS IAM',
        aliyun: 'RAM Access Control',
        desc: 'Dịch vụ IAM (quản lý danh tính và truy cập)'
      },
      {
        aws: 'AWS KMS',
        aliyun: 'KMS Key Management',
        desc: 'Dịch vụ quản lý khóa mã hóa'
      },
      {
        aws: 'AWS WAF',
        aliyun: 'WAF Firewall',
        desc: 'Web application firewall'
      },
      {
        aws: 'AWS Shield',
        aliyun: 'DDoS Protection',
        desc: 'Bảo vệ chống tấn công DDoS'
      },
      {
        aws: 'Amazon GuardDuty',
        aliyun: 'Cloud Security Center',
        desc: 'Phát hiện mối đe dọa thông minh'
      },
      {
        aws: 'AWS Certificate Manager',
        aliyun: 'SSL Certificate Service',
        desc: 'Quản lý SSL/TLS certificate'
      },
      {
        aws: 'AWS Secrets Manager',
        aliyun: 'Credentials Manager',
        desc: 'Lưu trữ thông tin bí mật'
      },
      {
        aws: 'Amazon Macie',
        aliyun: 'Sensitive Data Protection',
        desc: 'Phát hiện và bảo vệ dữ liệu nhạy cảm'
      }
    ]
  },
  database: {
    title: 'So sánh dịch vụ Database',
    services: [
      {
        aws: 'Amazon RDS',
        aliyun: 'RDS Relational Database',
        desc: 'Dịch vụ relational database được quản lý'
      },
      {
        aws: 'Amazon Aurora',
        aliyun: 'PolarDB',
        desc: 'Relational database cloud-native'
      },
      {
        aws: 'Amazon DynamoDB',
        aliyun: 'Tablestore',
        desc: 'NoSQL key-value và document database'
      },
      {
        aws: 'Amazon ElastiCache',
        aliyun: 'Cloud Database Redis',
        desc: 'Dịch vụ in-memory cache được quản lý'
      },
      {
        aws: 'Amazon DocumentDB',
        aliyun: 'MongoDB Replica Set',
        desc: 'Document database tương thích MongoDB'
      },
      {
        aws: 'Amazon Keyspaces',
        aliyun: 'Cassandra Service',
        desc: 'Dịch vụ tương thích Cassandra được quản lý'
      },
      {
        aws: 'Amazon Neptune',
        aliyun: 'Graph Database GDB',
        desc: 'Graph database fully managed'
      },
      {
        aws: 'Amazon QLDB',
        aliyun: 'Blockchain BaaS',
        desc: 'Ledger database fully managed'
      },
      {
        aws: 'Amazon Timestream',
        aliyun: 'Time Series Database TSDB',
        desc: 'Time series database fully managed'
      }
    ]
  },
  middleware: {
    title: 'So sánh dịch vụ Middleware',
    services: [
      {
        aws: 'Amazon MQ',
        aliyun: 'Message Queue MQ',
        desc: 'Dịch vụ message broker được quản lý'
      },
      {
        aws: 'Amazon SQS',
        aliyun: 'Message Service MNS',
        desc: 'Dịch vụ message queue fully managed'
      },
      {
        aws: 'Amazon SNS',
        aliyun: 'EventBridge',
        desc: 'Dịch vụ pub/sub fully managed'
      },
      {
        aws: 'Amazon Kinesis',
        aliyun: 'Realtime Compute Flink',
        desc: 'Xử lý real-time data stream'
      },
      {
        aws: 'AWS Step Functions',
        aliyun: 'Serverless Workflow',
        desc: 'Dịch vụ orchestration workflow'
      },
      {
        aws: 'AWS AppSync',
        aliyun: 'API Gateway',
        desc: 'Dịch vụ GraphQL được quản lý'
      },
      {
        aws: 'Amazon EventBridge',
        aliyun: 'Event Bus',
        desc: 'Serverless event bus'
      }
    ]
  }
}
</script>

<style scoped>
.cloud-services-map-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #7b2cbf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.map-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.service-layer {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-layer:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.service-layer.active {
  background: rgba(0, 212, 255, 0.15);
  border-color: #00d4ff;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}

.layer-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.layer-title {
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 8px;
  color: #e6f1ff;
}

.layer-services {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.service-tag {
  background: rgba(123, 44, 191, 0.3);
  color: #c084fc;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
}

.service-layer.active .service-tag {
  background: rgba(0, 212, 255, 0.3);
  color: #00d4ff;
}

.detail-panel {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-header h5 {
  margin: 0;
  color: #00d4ff;
  font-size: 1.1rem;
}

.close-btn {
  background: none;
  border: none;
  color: #8892b0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.comparison-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 2fr;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  color: #e6f1ff;
  margin-bottom: 8px;
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 2fr;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.875rem;
  transition: background 0.2s;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
}

.col.aws {
  color: #ff9900;
  font-weight: 500;
}

.col.aliyun {
  color: #ff6a00;
  font-weight: 500;
}

.col.desc {
  color: #8892b0;
}

@media (max-width: 768px) {
  .map-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr;
  }

  .col.desc {
    display: none;
  }
}

@media (max-width: 480px) {
  .map-container {
    grid-template-columns: 1fr;
  }
}
</style>
