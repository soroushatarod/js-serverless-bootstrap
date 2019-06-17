#!/usr/bin/env bash
 
# This files creates the necessary security group automatically
# so the lambda functions within the project can connect to
# staging's marc02 from our developer sandboxes.
#
# You can see more information at:
# https://zavamed.atlassian.net/wiki/spaces/TDEL/pages/304218163/How+to+connect+to+marc+s+preview+from+our+aws+sandboxes
 
SG_NAME="comms-service-marc02"
VPC_ID="vpc-8c62d4ea"
 
 
function project_dir() {
  echo "$(git rev-parse --show-toplevel)"
}
 
function sg_exists() {
  aws ec2 describe-security-groups \
    --filters Name=group-name,Values="${SG_NAME}" | jq '.SecurityGroups | length'
}
 
function get_sg_id() {
  aws ec2 describe-security-groups \
    --filters Name=group-name,Values="${SG_NAME}" | jq -r '.SecurityGroups[0].GroupId'
}
 
 
 if [[ `sg_exists` -eq 0 ]]; then
  aws ec2 create-security-group \
    --description "Allows to connect to marc02 from the test-kits service" \
    --group-name "${SG_NAME}" \
    --vpc-id="${VPC_ID}" > /dev/null 2>&1
 
  SG_GROUP_ID=`get_sg_id`
 
  aws ec2 authorize-security-group-egress \
    --group-id "${SG_GROUP_ID}" \
    --ip-permissions "IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges=[{CidrIp=0.0.0.0/0}]"
 
  echo "Security group created successfully"
 
  PROJECT_DIR=`project_dir`
 
  echo "# This file was automatically generated for the sandbox deployment process" > ${PROJECT_DIR}/.env
  echo "# Only to store the variables that are different for each developer, such" >> ${PROJECT_DIR}/.env
  echo "# as the security group, for example." >> ${PROJECT_DIR}/.env
  echo "AWS_SECURITY_GROUP=\"${SG_GROUP_ID}\"" >> ${PROJECT_DIR}/.env
  echo "" >> .env
 
  echo ".env file written successfully"
else
  echo "Security group already exists"
fi